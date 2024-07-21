import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditModal = ({ show, handleClose, handleEdit, task, title, description, setTitle, setDescription, deadline, setDl, recur, setRecur, minDate }) => {

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Body>
                <h4 className='modal-header'>Edit Task</h4>
                <form
                    className="update"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEdit(task._id, title, description, recur, deadline);
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
                    {!task.recurrence.includes(' ') && <>
                        <label>Recurrence </label>
                        <select value={recur} onChange={(e) => setRecur(e.target.value)}>
                            <option value="none">None</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <label>Deadline </label>
                        <DatePicker
                            selected={deadline}
                            onChange={(date) => setDl(date)}
                            dateFormat="dd/MM/yyyy"
                            minDate={minDate}
                        />
                    </>}
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