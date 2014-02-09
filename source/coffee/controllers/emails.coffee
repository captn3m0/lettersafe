define ['marionette'], (Marionette)->

	EmailsController = Marionette.Controller.extend
		fetchRecent: (callback)->
			console.log 'Fetching Recent Emails...'
			if typeof callback is 'function'
				templateURL = './data/recentEmails.json'
				mongoURL = 'https://localhost:3000/emails.json'
				$.getJSON mongoURL, (response)->
					if not response then console.error 'No data available'
					else callback response


	return new EmailsController()