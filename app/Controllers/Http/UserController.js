'use strict'

const Database = use('Database')
const User = use('App/Models/User')

// Executar no terminal: adonis make:controller User (selecionar a opção HTTP)
class UserController {
  // É recebido o ctx por parâmetro, ele é o contexto da requisição
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // Recuperando SOMENTE estes atributos
    const addresses = request.input('addresses')

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx) // Salvando o usuário

    await user.addresses().createMany(addresses, trx) // Criando todos os endereços recebidos pelo array

    await trx.commit()

    return user // Retornando a resposta, não precisa o response, ele já entende automáticamente por conta do --api-only na construção do projeto
  }
}

module.exports = UserController
