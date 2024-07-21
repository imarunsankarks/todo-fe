import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import Column from '../components/Column';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from '../components/Navbar';
import { Link } from "react-router-dom";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [utasks, setUtasks] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const { user } = useAuthContext();
    useEffect(() => {
        if (user) {
            const fetchTasks = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/api/routes', {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    setTasks(response.data);
                    setUtasks(response.data);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            };

            fetchTasks();

        }
    }, [user]);

    const deleteFilter = (id) => {
        setTasks(tasks.filter((item) => {
            return item._id !== id;
        }))
    }

    const editFilter = (id, title, description, time) => {
        setTasks(tasks.map((item) => {
            if (item._id === id) {
                return { ...item, title, description, time }
            }
            return item;
        }))
        setUtasks(tasks.map((item) => {
            if (item._id === id) {
                return { ...item, title, description, time }
            }
            return item;
        }))
    }

    const searchFilter = (value) => {
        if (value) {
            setTasks(utasks.filter((item) => {
                return item.title.toLowerCase().includes(value.toLowerCase());
            }));
        } else {
            setTasks(utasks);
            setSearchItem('')
        }
    }
    return (
        <>
            <Navbar />
            <div className="home">
                <div className="container">
                    <h2>Hi {user.name}</h2>
                    <p>Here are the list of tasks assigned to you.</p>
                    <div className="row my-4">
                        <div className="col-md-6 order-md-1 order-2">
                            <div className="search">
                                <input type="text" className="search-input" placeholder="Search any tasks..." value={searchItem} onChange={(e) => { searchFilter(e.target.value); setSearchItem(e.target.value) }} />
                                {searchItem && <button onClick={() => { searchFilter('') }}>clear</button>}
                            </div>
                        </div>
                        <div className="col-md-6 order-md-2 order-1">
                            <div className="add">
                                <p>Add a new task</p>
                                <Link to="/add"><button className="add-button">+</button></Link>
                            </div>
                        </div>
                    </div>
                    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                        <div className='tasks'>
                            <Column status="pending" tasks={tasks} deleteFilter={deleteFilter} editFilter={editFilter} setTasks={setTasks} />
                            <Column status="ongoing" tasks={tasks} deleteFilter={deleteFilter} editFilter={editFilter} setTasks={setTasks} />
                            <Column status="completed" tasks={tasks} deleteFilter={deleteFilter} editFilter={editFilter} setTasks={setTasks} />
                        </div>
                    </DndProvider>

                </div>
            </div>

        </>
    );
}

export default Home;