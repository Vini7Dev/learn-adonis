'use strict'

const Database = use('Database')
const User = use('App/Models/User')

// Executar no terminal: adonis make:controller User (selecionar a opção HTTP)
class UserController {
  // É recebido o ctx por parâmetro, ele é o contexto da requisição
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ]) // Recuperando SOMENTE estes atributos

    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx) // Salvando o usuário

    if (addresses) {
      await user.addresses().createMany(addresses, trx) // Criando todos os endereços recebidos pelo array
    }

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    await trx.commit()

    return user // Retornando a resposta, não precisa o response, ele já entende automáticamente por conta do --api-only na construção do projeto
  }

  async index () {
    const users = await User
      .query()
      .with('addresses')
      .with('roles')
      .with('permissions')
      .fetch()

    return users
  }

  // É recebido o ctx por parâmetro, ele é o contexto da requisição
  async update ({ params, request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])

    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.findOrFail(params.id, trx)

    user.merge(data)

    await user.save()

    if (addresses) {
      await user.addresses().createMany(addresses, trx)
    }

    if (roles) {
      await user.roles().attach(roles, trx)
    }

    if (permissions) {
      await user.permissions().attach(permissions, trx)
    }

    await user.loadMany(['roles', 'permissions'])

    await trx.commit()

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
