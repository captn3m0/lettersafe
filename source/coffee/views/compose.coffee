define ['marionette'], (Marionette)->

	ComposeView = Marionette.ItemView.extend
		template: jade.templates['compose']
		events:
			'click .do-sendmail': 'sendMail'

		initialize: ->
			console.log 'Compose Render'
			$(".do-sendmail").removeClass('hidden')

		sendMail: ->
			obj = {}
			obj.to = @.$el.find('#toaddress')
			obj.from = 'nanuclickity'
			obj.text = @.$el.find('#text')
			obj.subject = @.$el.find('#tosubject')
			$.post '/send', obj, (response)->
				console.log 'Sending... '
				console.log 'This is the response...'
				console.log response

	View = new ComposeView()
	
	return View