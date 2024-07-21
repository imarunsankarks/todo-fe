import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, handleClose, handleDelete, task }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Body>Are you sure you want to delete the task "<i>{task.title}</i>"?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className='close' onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" className='delete' onClick={() => handleDelete(task._id)}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
