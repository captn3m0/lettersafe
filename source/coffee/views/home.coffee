define ['marionette'], (Marionette)->

	HomeView = Marionette.ItemView.extend
		template: jade.templates['home']
		events: 
			'click .login-button': 'doLogin'

		doLogin: ->
		 	uname = @.$el.find('#username').val()
		 	ppass = @.$el.find('#password').val()

		 	$.post 'https://localhost:3000/login', {username: uname, password: ppass}, (response)->
		 		if response is 'OK'
		 			Backbone.history.navigate 'inbox', {trigger:true}
		 		else
		 			Backbone.history.navigate 'register', {trigger: true}
		 			


		onRender: ->
			# Full width on container
			@.$el.attr 'data-fullwidth', 'true'

			$.getJSON 'https://localhost:3000/debug', (data)->
				if data.username?
					console.log 'Already logged in... Proceeding.'
					Backbone.history.navigate 'inbox', {trigger:true}
				else
					console.error 'Login is mandatory'

	View = new HomeView()
	
	return View