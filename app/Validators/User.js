'use strict'

// adonis make:validator User

class User {
  // Para validar todos os campos ao invés de parar no primeiro errado
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = User
