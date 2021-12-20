'use strict'

// INFO: Rodar no terminal "adonis route:list"
const Route = use('Route')

Route.post('users', 'UserController.store')
