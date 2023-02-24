const carsDAO = require('../DAO/carsDAO')

class carsController {
    static rotas(app){

        app.get('/carro', carsController.listar)
        app.post('/carro', carsController.inserir)
        app.delete('/carro/:id', carsController.deletar)
        app.put('/carro/:id', carsController.atualizar)
    }

    // GET
    static async listar(req, res){
        const carros = await carsDAO.listar()
        
        // Devolve a lista de usuarios e o status code 200, quer dizer que a requisição foi bem sucedida.
        res.status(200).send(carros)
    }

    // POST
    static async inserir(req, res){
        const carro = {
            nome: req.body.nome,
            ano: req.body.ano,
            valor: req.body.valor
        }

        // Verifica se o corpo da requisição está sendo enviado com todas as chaves, se faltar alguma chave, entra no If e dá um status de requisição mal sucedida, dá um return encerrando a função.
        if(!carro || !carro.nome || !carro.ano || !carro.valor) {
            res.status(400).send("Precisa passar as informações")
            return
        }

        // Classe BooksDAO é chamada com o método inserir para adicionar o carro na tabela de books no banco e retorna o resultado da operação que é o próprio carro cadastrado
        const result = await carsDAO.inserir(carro)

        // Se o resultado retornado não for o carro que enviamos, ele trará a informação da chave erro. Esse retorno de erro tem ligação com uma funcão de conexão do próprio SQLite. Se entrar no If, dá um status code 500.        
        if(result.erro) {
            res.status(500).send(result)
        }

        // Se o cadastro ocorrer tudo OK, devolve o status code 201, que é o ideal para ROTAS POST, que quer dizer: Recurso Criado, ou seja, houve a cadastro de algo no banco. 
        // Abaixo a resposta personalizada que será mostrada, em caso de status 201. Além da mensagem, mostra também o objeto cadastrado
        res.status(201).send({"Mensagem": "carro criado com sucesso", "Novo carro: ": carro})
    }

    // DELETE
    static async deletar(req, res) {
        // Envia a constante id do usuário para BooksDAO.deletar.
        const carro = await carsDAO.deletar(req.params.id)

        // Se o carro não for encontrado, devolve um erro staus code 500.
        if(carro.erro){
            res.status(500).send({'Menssagem': 'Erro ao deletar o carro'})
            return
        }

        res.status(200).send({mensagem: 'carro removido com sucesso'})
    }

    // PUT --   Função RUN - Executa a função. No callback NÂO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "carro" atualizado com sucesso" }
    static async atualizar(req, res){
        const carro = {
            nome: req.body.nome,
            valor: req.body.valor,
            ano: req.body.ano
        }

        const result = await carsDAO.atualizar(req.params.id, carro)

        if(result.erro){
            res.status(500).send('Erro ao atualizar o carro')
            return
        }

        res.status(200).send({mensagem: 'carro atualizado com sucesso', "carro: ": carro})
    }
}

// Exportação da Classe "carsController"
module.exports = carsController