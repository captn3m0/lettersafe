define ['backbone'], (Backbone)->

	Model = Backbone.Model.extend
		defaults:
			headerTitle: 'LetterSafe'
	
	return new Model