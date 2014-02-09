define ['marionette'], (Marionette)->

	HomeView = Marionette.ItemView.extend
		template: jade.templates['home']
		events: 
			'click .login-button': 'doRegister'

		doRegister: ->
		 	uname = @.$el.find('#username').val()
		 	ppass = @.$el.find('#password').val()

		 	$.post 'https://localhost:3000/register', {username: uname, password: ppass}, (response)->
		 		if response is 'Fail'
		 			Backbone.history.navigate 'register', {trigger: true}
		 		else Backbone.history.navigate 'inbox', {trigger:true}


		onRender: ->
			# Full width on container
			@.$el.attr 'data-fullwidth', 'true'
			@.$el.find('.login-button').text('Register')

	View = new HomeView()
	
	return View