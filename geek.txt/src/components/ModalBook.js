import { Modal } from 'semantic-ui-react'


const ModalBook = ({open, setOpen}) => {
    return (
        <Modal
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            <Modal.Header>Book Title</Modal.Header>
            <Modal.Description>
          <p>
            This is an example of expanded content that will cause the modal's
            dimmer to scroll.
          </p>
        </Modal.Description>
        </Modal>
    )
}

export default ModalBook;