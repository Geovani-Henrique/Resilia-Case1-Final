const carrosApi = () => {
    const url = 'http://localhost:4040'
  
    return {
        getcarros () {
            return fetch(`${url}/carro`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        deletecarro (carroId) {
          return fetch(`${url}/carro/${carroId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
         })
        },
        createcarro (nome, valor, ano) {
          return fetch(`${url}/carro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                nome: nome,
                valor: valor,
                ano: ano
              }
            )
         })
        },
        updatecarro(carroId, nome, valor, ano) {
          return fetch(`${url}/carro/${carroId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                nome: nome,
                valor: valor,
                ano: ano
              }
            )
         })
        },
    }
  }
  
  export default carrosApi