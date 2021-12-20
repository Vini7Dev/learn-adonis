'use strict'

// INFO: Rodar no terminal "adonis route:list"
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')

// Criando rotas exclusivas para quem está autenticado
Route.group(() => {
  Route.post('files', 'FileController.store')

  // Criando todas as rotas de uma vez (o apiOnly excluí as rotas de create e edit)
  Route.resource('projects', 'ProjectController').apiOnly()

  // Cria a rota já com o id do projeto, ex: GET projects/:project_id/tasks
  // Usado somente em casos extremos como quando o registro precisa de ter um pai antes de ser criado
  Route.resource('projects.tasks', 'TaskController').apiOnly()
}).middleware(['auth'])
