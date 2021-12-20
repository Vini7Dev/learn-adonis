'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params }) {
    const tasks = await Task
      .query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  async store ({ params, request }) {
    const data = request.only([
      'title',
      'description',
      'user_id',
      'due_date',
      'file_id'
    ])

    const task = await Task.create({
      project_id: params.projects_id,
      ...data
    })

    await task.save()

    return task
  }

  async show ({ params }) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  async update ({ params, request }) {
    const task = await Task.findOrFail(params.id)

    const data = request.only([
      'title',
      'description',
      'user_id',
      'due_date',
      'file_id'
    ])

    task.merge(data)

    await task.save()

    return task
  }

  async destroy ({ params, request, response }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
