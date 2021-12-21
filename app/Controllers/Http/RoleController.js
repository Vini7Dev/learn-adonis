'use strict'

const Role = use('Role')

class RoleController {
  async index ({ request, response }) {
    try {
      const { page } = request.get()

      const roles = await Role
        .query()
        .with('permissions')
        .paginate(page)

      return roles
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async show ({ params, response }) {
    try {
      const role = await Role.findOrFail(params.id)

      await role.load('permissions')

      return role
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async store ({ request, response }) {
    try {
      const { permissions, ...data } = request.only([
        'name',
        'slug',
        'description',
        'permissions' // Array com os IDs das permissions
      ])

      const role = await Role.create(data)

      if (permissions) {
        await role.permissions().attach(permissions)
      }

      await role.load('permissions')

      return role
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async update ({ params, request, response }) {
    try {
      const { permissions, ...data } = request.only([
        'name',
        'slug',
        'description',
        'permissions' // Array com os IDs das permissions
      ])

      const role = await Role.findOrFail(params.id)

      role.merge(data)

      await role.save()

      if (permissions) {
        await role.permissions().sync(permissions) // Remove as antigas e atualiza com as novas permissions
      }

      await role.load('permissions')

      return role
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const role = await Role.findOrFail(params.id)

      await role.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }
}

module.exports = RoleController
