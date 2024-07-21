import { Modal, Button } from 'react-bootstrap';
const ViewModal = ({ show, handleClose, task }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Body>
                <h4 className='modal-header'>Task Details</h4>
                <div className="modal-created"><span>Added on </span>{task.createdAt.split('T')[0]}</div>
                <h5 className="modal-task-title">{task.title}</h5>
                <p className="modal-task-description"><span>Description</span> <br></br>{task.description}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className='close' onClick={handleClose}>
                    Close
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ViewModal;