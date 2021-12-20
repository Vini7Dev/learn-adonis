'use strict'

const crypto = require('crypto')
const User = use('App/Models/User')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email') // Busca um único campo na requisição

      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save(user)
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Algo não deu certo, este e=mail existe?' }
      })
    }
  }
}

module.exports = ForgotPasswordController
