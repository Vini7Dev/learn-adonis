'use strict'

// INFO: Rodar no terminal "adonis route:list"
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')

// Criando rotas exclusivas para quem está autenticado
Route.group(() => {
  Route.post('files', 'FileController.store')

  // Criando todas as rotas de uma vez (o apiOnly excluí as rotas de create e update)
  Route.resource('projects', 'ProjectController').apiOnly()
}).middleware(['auth'])
