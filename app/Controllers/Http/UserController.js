'use strict'

const User = use('App/Models/User')

// Executar no terminal: adonis make:controller User (selecionar a opção HTTP)
class UserController {
  // É recebido o ctx por parâmetro, ele é o contexto da requisição
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // Recuperando SOMENTE estes atributos

    const user = User.create(data) // Salvando o usuário

    return user // Retornando a resposta, não precisa o response, ele já entende automáticamente por conta do --api-only na construção do projeto
  }
}

module.exports = UserController
