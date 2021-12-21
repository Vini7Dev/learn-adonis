'use strict'

// INFO: Rodar no terminal "adonis route:list"
const Route = use('Route')

// Old: Route.post('users', 'UserController.store').validator('User')

Route.resource('users', 'UserController')
// .middleware(['auth', 'is:(administrator || moderator)'])

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

// Criando rotas exclusivas para quem está autenticado
Route.group(() => {
  Route.post('files', 'FileController.store')

  // Criando todas as rotas de uma vez (o apiOnly excluí as rotas de create e edit)
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([
      [
        ['project.store'], ['Project']
      ]
    ]))

  Route.delete('projects/:id', 'ProjectController.destroy')
    .middleware(['can:(list_projects)'])

  // Cria a rota já com o id do projeto, ex: GET projects/:project_id/tasks
  // Usado somente em casos extremos como quando o registro precisa de ter um pai antes de ser criado
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([
      [
        ['project.store'], ['Task']
      ]
    ]))

  // Permissões e funções
  Route.resource('permissions', 'PermissionController')
    .apiOnly()

  Route.resource('roles', 'RoleController')
    .apiOnly()
}).middleware(['auth', 'is:(administrator || moderator)'])
