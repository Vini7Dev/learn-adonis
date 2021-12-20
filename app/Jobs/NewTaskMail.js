'use strict'

// adonis make:job NewTaskMail

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // Quantos deste job vou processar ao mesmo tempo (paralelamente)
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskMail-job'
  }

  async handle ({ username, email, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`)

    await Mail.send(
      ['emails.new_task'],
      { username, title, hasAttachment: !!file },
      message => {
        message
          .to(email)
          .from('example@mail.com', 'Example')
          .subject('New task for you!')

        // Anexo da imagem
        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
