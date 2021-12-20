'use strict'

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  // Como se fosse o construtor da classe
  static boot () {
    super.boot()

    // Adicionando um Hook que será executada antes de salvar o usuário no banco
    // -> O Hook é uma função que é executada automáticamente
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  // Criando um relacionamento com a tabela de Token
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
