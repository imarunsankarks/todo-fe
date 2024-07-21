import { useDrop } from 'react-dnd';
import Task from './Task';
import axios from 'axios';
import { useAuthContext } from "../hooks/useAuthContext";

const Column = ({ status, tasks, setTasks, deleteFilter, editFilter }) => {
    const { user } = useAuthContext();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: async (item) => {
            if (!user) return;
            try {
                await axios.patch(`http://localhost:4000/api/routes/${item.id}`,
                    { status },
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === item.id ? { ...task, status } : task
                    )
                );
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    const getColumnClass = (status) => {
        switch (status) {
            case 'pending':
                return 'column1';
            case 'ongoing':
                return 'column2';
            case 'completed':
                return 'column3';
            default:
                return '';
        }
    };

    return (
        <div ref={drop} className={`column ${getColumnClass(status)} ${isOver ? 'is-over' : ''}`}>
            <p className='status'>{status}</p>
            {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                    <Task key={task._id} task={task} deleteFilter={deleteFilter} editFilter={editFilter} />
                ))}
        </div>
    );
};

export default Column;