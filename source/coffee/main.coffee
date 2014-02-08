requirejs.config 
	baseUrl: './js/' 
	paths:
		jquery: './libs/jquery'
		jqueryui: './libs/jquery-ui'
		bootstrap: './libs/bootstrap'
		underscore: './libs/underscore'
		backbone: './libs/backbone'
		marionette: './libs/backbone.marionette'
		templates: './templates'
		app: './app'
		vent: './utils/vent'


	shim:
		jquery:
			exports: 'jQuery'
		jqueryui: 
			deps: ['jquery']
		bootstrap:
			deps: ['jquery']
		underscore:
			exports: '_'
		templates:
			exports: 'jade'
		backbone:
		  deps: ['jquery', 'underscore']
		  exports: 'Backbone'
		marionette:
		  deps: ['underscore', 'jquery', 'backbone']
		  exports: 'Marionette'
		app:
			deps: ['marionette', 'jqueryui', 'bootstrap']
			exports: 'App'


# Initiation Code
requirejs ['app', 'templates'], (App, jade)->

	# Use Handlebars Template
	Marionette.Renderer.render = (tpl, data)->
		if typeof tpl is 'function'
			tplFn = tpl
		else 
			tplFn = jade.templates[tpl]
		return tplFn data


	# Start the Application
	App.start()