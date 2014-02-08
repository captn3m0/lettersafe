define ['regions/header', 'regions/content','regions/menu', 'routers/approuter'], (HeaderRegion, ContentRegion, MenuRegion, AppRouter)->
	App = new Marionette.Application()
	
	App.addInitializer ()->
		AppRouter.doubleCheck()

	App.on 'start', ()->
		Backbone.history.start({pushState: false, hashChange: true}) unless Backbone.History.started
		console.log 'History :: Started'
	
	return App