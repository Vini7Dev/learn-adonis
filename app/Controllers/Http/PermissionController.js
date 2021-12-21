'use strict'

const Permission = use('Permission')

class PermissionController {
  async index ({ request }) {
    const { page } = request.get()

    const permissions = await Permission
      .query()
      .paginate(page)

    return permissions
  }

  async show ({ params, response }) {
    try {
      const permission = await Permission.findOrFail(params.id)

      return permission
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.only(['name', 'slug', 'description'])

      const permission = await Permission.create(data)

      return permission
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.only(['name', 'slug', 'description'])

      const permission = await Permission.findOrFail(params.id)

      permission.merge(data)

      await permission.save()

      return permission
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }

  async destroy ({ params, response }) {
    try {
      const permission = await Permission.findOrFail(params.id)

      await permission.delete()
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo deu errado!' }
      })
    }
  }
}

module.exports = PermissionController
