import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { endOfWeek, endOfMonth } from 'date-fns';

const Add = () => {
    const { user } = useAuthContext();
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [recur, setRecur] = useState("none");
    const [description, setDescription] = useState('');

    const today = new Date();

    today.setHours(0, 0, 0, 0);




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && description) {
            try {
                await axios.post(`${process.env.REACT_APP_BE_URL}/api/routes/`, {
                    title: title,
                    description: description,
                    recurrence: recur,
                    deadline: startDate
                }, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
                });
                setTitle('');
                setDescription('');
                setError('');
                setRecur('none');
                setStartDate(new Date());
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
    let minDate;
    if (recur === 'weekly') {
        minDate = endOfWeek(new Date(), { weekStartsOn: 0 });
    } else if (recur === 'monthly') {
        minDate = endOfMonth(new Date());
    } else {
        minDate = new Date();
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
                                <div className="row g-3">
                                    <div className="col-lg-6">
                                        <div className="recur">
                                            <label>Recurrence </label>
                                            <select value={recur} onChange={(e) => setRecur(e.target.value)}>
                                                <option value="none">None</option>
                                                <option value="daily">Daily</option>
                                                <option value="weekly">Weekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div className="col-lg-6">
                                        <div className="date-pick">
                                            <label>Deadline</label>
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={minDate}
                                            />
                                        </div>

                                    </div>
                                </div>
                                <button className="add-task-btn">Add Task</button>
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