define ['backbone'], (Backbone)->

	Model = Backbone.Model.extend
		defaults:
			iconClass: 'fa fa-fw fa-envelope-o'
			subject: 'No Subject'
			hasAttachment: false
			timestamp: new Date()

	return Model