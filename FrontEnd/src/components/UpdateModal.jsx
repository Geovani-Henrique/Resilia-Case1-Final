import { Modal, Button, Form } from 'react-bootstrap'

function UpdateModal(props) {
  return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.isModalOpen}>
        <Form onSubmit={(event) => {
          props.updateCarro(event)
        }}>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title>Atualizar Carro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="Nome">
            <Form.Label>
              Nome
            </Form.Label>
            <Form.Control defaultValue={props.cars.nome} type="varchar" />
          </Form.Group>

          <Form.Group controlId="Valor">
            <Form.Label>
              Valor
            </Form.Label>
            <Form.Control defaultValue={props.cars.valor} type="number" />
          </Form.Group>

          <Form.Group controlId="Ano">
            <Form.Label>
              Ano
            </Form.Label>
            <Form.Control defaultValue={props.cars.ano} type="number" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
          <Button variant="primary" type="submit">Salvar</Button>
        </Modal.Footer>
        </Form>
      </Modal >
    </div>
  )
}

export default UpdateModal
