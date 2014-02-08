define ['backbone', 'models/email-item'], (Backbone, Model)->
	
	EmailList = Backbone.Collection.extend
		model: Model
		url: "./data/recentEmails.json"
		initialize: (models, options)->
			if options?
				if options.fetchNumber? then this.fetchNumber
		

	return EmailList