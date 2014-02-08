define ['backbone'], (Backbone)->
	
	Model = Backbone.Model.extend
		defaults:
			name: 'Sample Menu Item'
			iconClass: 'fa fa-fw fa-music'
			hasSubMenu: false
			isActive: false

	return Model