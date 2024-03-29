define ['backbone', 'models/menu-item'], (Backbone, MenuItemModel)->

	Collection = Backbone.Collection.extend 
		model: MenuItemModel

	menuItems = [
		{
			name: 'Compose',
			iconClass: 'fa fa-fw fa-file'
		}
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
			name: 'Register',
			iconClass: 'fa fa-fw fa-sign-in'
		},
		{
			name: 'Logout',
			iconClass: 'fa fa-fw fa-sign-out'
		}
	]
	

	return new Collection menuItems