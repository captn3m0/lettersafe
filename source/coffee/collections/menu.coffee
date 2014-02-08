define ['backbone', 'models/menu-item'], (Backbone, MenuItemModel)->

	Collection = Backbone.Collection.extend 
		model: MenuItemModel

	menuItems = [
		{
			name: 'Inbox'
			iconClass: 'fa fa-fw fa-inbox'
		},
		{
			name: 'Drafts',
			iconClass: 'fa fa-fw fa-file-text'
			isActive: true
		},
		{
			name: 'Starred',
			iconClass: 'fa fa-fw fa-star'
		},
		{
			name: 'Sent',
			iconClass: 'fa fa-fw fa-sign-out'
		},
		{
			name: 'Trash',
			iconClass: 'fa fa-fw fa-trash-o'
		},
		{
			name: 'Spam'
			iconClass: 'fa fa-fw fa-ban'
		}
	]
	

	return new Collection menuItems