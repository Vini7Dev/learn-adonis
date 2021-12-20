'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  // O "dirty" possuí quais informações foram alteradas
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { username, email } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()
  const { title } = taskInstance

  Kue.dispatch(
    Job.key,
    { username, email, title, file },
    { attemps: 3 }
  )
}
