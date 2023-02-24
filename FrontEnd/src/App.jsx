import { Table, Container, Button } from 'react-bootstrap'
import CarsApi from './api/CarsApi'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

function App() {
  const [Cars, setCars] = useState()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedCars, setSelectedCars] = useState()

  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleShowCreateModal = () => setIsCreateModalOpen(true);

  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
  const handleShowUpdateModal = () => setIsUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await CarsApi().getCars().then(data => {
        return data.json()
      })
      .then(data => {
        setCars(data)
      })
    }

    getData()
  }, [])

  async function createCars(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await CarsApi().createCars(
        req.nome.value, Number(req.valor.value), Number(req.ano.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setCars([...Cars, {
          id: res.CarsId,
          nome: req.nome.value,
          valor: Number(req.valor.value),
          ano: Number(req.ano.value)
        }])

        setIsCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function deleteCars(CarsId) {
    try {
      await CarsApi().deleteCars(CarsId)

      const formattedCars = Cars.filter(cont => {
        if(cont.id !== CarsId){
          return cont
        }
      })

      setCars(formattedCars)
    } catch(err) {
      throw err
    }
  }

  async function updateCars(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await CarsApi().updateCars(
        selectedCars.id, req.nome.value, Number(req.valor.value), Number(req.ano.value)
      )

      const formattedCars = Cars.map(cont => {
        if(cont.id === selectedCars.id) {
          return {
            id: selectedCars.id,
            nome: req.nome.value,
            valor: Number(req.valor.value),
            ano: Number(req.ano.value)
          }
        }

        return cont
      })

      setCars(formattedCars)

      setIsUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return (
    <>
    <Container
    className="
    d-flex
    flex-column
    align-items-start
    justify-content-center
    h-100
    w-100
    "
    >
      <Button
        className="mb-2"
        onClick={handleShowCreateModal}
        variant='primary'>
        Inserir Carro
      </Button>
       <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {Cars && Cars.map(cont => (
            <tr key={cont.id}>
              <td>{cont.nome}</td>
              <td>{cont.valor}</td>
              <td>{cont.ano}</td>
              <td>
                <Button onClick={() => deleteCars(cont.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedCars(cont)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal isModalOpen={isCreateModalOpen} handleClose={handleCloseCreateModal} createCars={createCars} />
    {selectedCars && (
      <UpdateModal isModalOpen={isUpdateModalOpen} handleClose={handleCloseUpdateModal} updateCars={updateCars} Cars={selectedCars} />
    )}
    </>
  )
}

export default App
