define ['models/menu', 'collections/menu','vent', 'controllers/menu'], (Model, Collection, vent, Controller)->

	# Single Menu Item
	MenuItemView = Marionette.ItemView.extend
		template: jade.templates['menu-item']
		tagName: 'li'
		events:
			'click .menu-item': 'handleMenuClick'
		modelEvents:
			'change:isActive': 'toggleActive'
		toggleActive: ->
			isActive = @.model.get('isActive')
			if isActive 
				@.$el.find('.menu-item').addClass 'active'
				@.renderMenu()
			if not isActive then @.$el.find('.menu-item').removeClass 'active'

		handleMenuClick: ->
			action = ''
			if @.model.get('subMenuList')
				action = 'menu:togglesubmenu'
			else
				action = 'menu:toggleactive'
			vent.trigger 'menu:toggleactive', @.model.cid	

		renderMenu: -> 
			model = @.model
			Controller.renderMenu(model)


	# Main Menu
	menuView = Marionette.CompositeView.extend
		template: jade.templates.menu
		itemView: MenuItemView
		itemViewContainer: '.menu-items-list'
		itemViewOptions: -> return {parentEl: @.el}
		model: Model
		collection: Collection
		events:
			'click .do-hideMenu': 'hideMenu'
			'blur': 'loseFocus'
		loseFocus: ->
			console.log 'Unfocused window'
		hideMenu: ->
			console.log 'Clicked Trigger'
			vent.trigger 'menu:hide'			
			
		setMenuActive: (_modelcid)->
			# Detaches .active from .menu-item.active
			# ensures that only one .menu-item is active in ui			
			results = @.children.filter (k)-> return (k.model.get('isActive'))
			if results.length
				activeView = results[0]
				# console.log 'Disabling . ' + activeView.model.get('name')
				activeView.model.set 'isActive', false
			
			targetView = @.children.findByModelCid _modelcid
			# console.log 'Enabling . ' + targetView.model.get('name')
			targetView.model.set 'isActive', true


	
	View = new menuView()
	
	# Attach the event to global vent
	# The alternative would be to utilize EventBubbling,
	# from childviews to parent
	# Likely to be included in next release.
	vent.on 'menu:toggleactive', (modelCid)-> View.setMenuActive modelCid
	vent.on 'menu:defaultactive', (fragment)->
		regex = new RegExp ' ', 'g'
		# Get a model match for this fragment
		results = View.children.find (k)->
			k.model.get('name').toLowerCase().replace(regex, '') is fragment
		View.setMenuActive results.model.cid
		


	return View