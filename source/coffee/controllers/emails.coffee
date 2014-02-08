define ['marionette'], (Marionette)->

	EmailsController = Marionette.Controller.extend
		fetchRecent: (callback)->
			console.log 'Fetching Recent Emails...'
			if typeof callback is 'function'
				$.getJSON './data/recentEmails.json', (response)->
					if not response then console.error 'No data available'
					else callback response


	return new EmailsController()