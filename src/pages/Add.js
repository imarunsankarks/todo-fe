import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && description) {
            try {
                await axios.post('http://localhost:4000/api/routes', {
                    title: title,
                    description: description,
                    deadline: new Date()
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });
                setTitle('');
                setDescription('');
                setError('');
                toast('Task added!',
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
                setError(err.response.data.message);
            }
        } else {
            setError('Please fill all the fields');
        }

    }

    return (
        <>
            <Navbar />
            <div className="add-task">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <h2>Add a new task</h2>
                            <form className="create" onSubmit={handleSubmit}>
                                <label>Task</label>
                                <input
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                                <label>Description</label>
                                <textarea
                                    rows={5}
                                    column={50}
                                    type="text"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                                {/* <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        /> */}
                                <button>Add Task</button>
                                {error && <div className="error">{error}</div>}
                            </form>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Add;