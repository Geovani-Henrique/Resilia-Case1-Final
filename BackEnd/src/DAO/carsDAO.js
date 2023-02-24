

// Importação do arquivo "db.js"
const db = require("../infra/db");

// Essa classe encapsula o acesso ao Banco de Dados.
class carsDAO {

    // GET  --  Função ALL - Retorna todas as linhas.
    static listar() {
        const query = 'SELECT * FROM CARROS';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows)
            });
        });
    }

    // POST  --  Função RUN - Executa a função. No callback NÃO existe o argumento ROWS, apenas o argumento ERR, porém devolvemos ao usuário.
    static inserir(carro) {
        const query = 'INSERT INTO CARROS (nome, valor, ano) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.run(query, [carro.nome, carro.valor, carro.ano], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao inserir o carro",
                        erro: err,
                    });
                }
                resolve(carro);
            });
        });
    }

    // DELETE -- Função RUN - Executa a função. No callback NÃO existe o argumento ROWS e nem ROW. Existe apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Carro deletado com sucesso" }
    static deletar(id) {
        const query = 'DELETE FROM CARROS WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao deletar o carro",
                        erro: err
                    });
                }
                resolve({ mensagem: "Carro deletado com sucesso", id: id })
            });
        });
    }
    
    // PUT -- Função RUN - Executa a função. No callback NÃO existe o argumento ROWS, apenas o argumento ERR. Se tudo der certo, devolve o objeto: { mensagem: "Carro atualizado com sucesso" }
    static atualizar(id, carro) {
        const query = 'UPDATE CARROS SET nome = ?, valor = ?, ano = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.run(query, [carro.nome, carro.valor, carro.ano, id], (err) => {
                if (err) {
                    reject({
                        mensagem: "Erro ao atualizar o carro",
                        erro: err,
                    });
                }
                resolve({ mensagem: "Carro atualizado com sucesso" });
            });
        });
    }

}

// Exportação da classe
module.exports = carsDAO
