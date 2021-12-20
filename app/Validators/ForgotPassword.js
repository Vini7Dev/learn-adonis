'use strict'

class ForgotPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      redirect_url: 'required|url',
      email: 'required|email'
    }
  }
}

module.exports = ForgotPassword
