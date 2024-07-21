import { useState } from 'react';
import { useDrag } from 'react-dnd';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import DeleteModal from './DeleteModal';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import toast, { Toaster } from "react-hot-toast";
import { endOfWeek, endOfMonth } from 'date-fns';

const Task = ({ task, deleteFilter, editFilter }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    const { user } = useAuthContext();

    const [show, setShow] = useState(false);
    const [showView, setShowView] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [recur, setRecur] = useState(task.recurrence);
    const [dl, setDl] = useState(task.deadline);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseView = () => setShowView(false);
    const handleShowView = () => setShowView(true);

    const handleCloseEdit = (val) => {
        setShowEdit(false)
        if (val) {
            setTitle(task.title);
            setDescription(task.description);
            setRecur(task.recurrence);
            setDl(task.deadline);
        }
    };
    const handleShowEdit = () => setShowEdit(true);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BE_URL}/api/routes/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            });
            handleClose();
            deleteFilter(id);
            toast('Task deleted!',
                {
                    icon: '❌',
                    style: {
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                        boxShadow: '0 3px 0px rgba(0, 0, 0, 0.1)',
                    },
                    duration: 1500,
                }
            );
        } catch (err) {
            toast(err.message,
                {
                    icon: '❌',
                    style: {
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                        boxShadow: '0 3px 0px rgba(0, 0, 0, 0.1)',
                    },
                    duration: 3500,
                }
            );
        }
    };

    const handleEdit = async (id, newTitle, newDescription, newRecur, newDeadline) => {
        try {
            await axios.patch(`${process.env.REACT_APP_BE_URL}/api/routes/${id}`,
                {
                    title: newTitle,
                    description: newDescription,
                    recurrence: newRecur,
                    deadline: newDeadline,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                }
            );
            handleCloseEdit();
            editFilter(id, newTitle, newDescription, newRecur, newDeadline);
            toast('Task updated!',
                {
                    icon: '✅',
                    style: {
                        borderRadius: '12px',
                        background: '#333',
                        color: '#fff',
                        boxShadow: '0 3px 0px rgba(0, 0, 0, 0.1)',
                    },
                    duration: 1500,
                }
            );

        } catch (err) {
            console.log(err);
        }
    }

    let minDate;
    if (recur === 'weekly') {
        minDate = endOfWeek(new Date(), { weekStartsOn: 0 });
    } else if (recur === 'monthly') {
        minDate = endOfMonth(new Date());
    } else {
        minDate = new Date();
    }

    const deadline = new Date(task.deadline);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const isDeadlineExceeded = deadline < today;

    return (
        <>
            <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <div className={`each-task ${isDeadlineExceeded ? 'deadline-exceeded' : ''}`}>
                    <div className="created">{isDeadlineExceeded ? 'Deadline exceeded' : `Complete by ${task.deadline.split('T')[0]}`}</div>
                    <div className="task-title">{task.title}</div>
                    <div className="task-description">{task.description}</div>
                    <div className="buttons">
                        <button className="edit" onClick={handleShowEdit}>Edit</button>
                        <button className="delete" onClick={handleShow}>Delete</button>
                    </div>
                    <DeleteModal
                        show={show}
                        handleClose={handleClose}
                        handleDelete={handleDelete}
                        task={task}
                    />
                    <ViewModal
                        show={showView}
                        handleClose={handleCloseView}
                        task={task}
                    />
                    <EditModal
                        show={showEdit}
                        handleClose={handleCloseEdit}
                        task={task}
                        handleEdit={handleEdit}
                        title={title}
                        description={description}
                        setTitle={setTitle}
                        setDescription={setDescription}
                        deadline={dl}
                        setDl={setDl}
                        recur={recur}
                        setRecur={setRecur}
                        minDate={minDate}

                    />
                    <div className="view">
                        <button onClick={handleShowView}>{`>`}</button>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Task;
