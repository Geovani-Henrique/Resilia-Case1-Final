// Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado.

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');



// Declaração SQL usada para criar a estrutura da tabela no banco de dados, permitindo que possamos inserir e consultar dados posteriormente.
const CARS_SCHEMA = `
CREATE TABLE IF NOT EXISTS "CARROS" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nome" varchar(90),
    "valor" number,
    "ano" number
);`;




function createTablecars() {
    db.run(CARS_SCHEMA, (error)=> {
      if (error) console.log("Erro ao criar tabela de carros");
    });
}



db.serialize( ()=> {
    createTablecars();
    //populateTablecars();
});