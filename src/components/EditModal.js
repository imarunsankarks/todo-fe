import { Modal, Button } from 'react-bootstrap';
const EditModal = ({ show, handleClose, handleEdit, task, title, description, setTitle, setDescription }) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Body>
                <h4 className='modal-header'>Edit Task</h4>
                <form
                    className="update"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEdit(task._id, title, description);
                    }}
                >
                    <label>Task</label>
                    <input
                        type="text"
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        value={title}
                        required
                    />
                    <label>Description</label>
                    <textarea
                        rows="5"
                        cols="50"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    ></textarea>
                    <div className="buttons">
                        <Button variant="secondary" className='close' onClick={() => { handleClose(true) }}>
                            Close
                        </Button>
                        <button className='update'>Update</button>

                    </div>

                </form>
            </Modal.Body>
        </Modal>
    );
}

export default EditModal;