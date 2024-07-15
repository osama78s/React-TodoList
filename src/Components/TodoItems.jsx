import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const TodoItems = ({ todoContainer, setTodoContainer }) => {

    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const handleDelete = (id) => {
        const newArr = todoContainer.filter((item, index) => index !== id);
        setTodoContainer(newArr);
        localStorage.setItem('todos', JSON.stringify(newArr));
    }



    const handleEdit = (index) => {
        setEditIndex(index);
        // setEditText(todoContainer[index].todo_task);
    }

    const handleUpdate = () => {
        if (editIndex !== null) {
            const newArr = todoContainer.map((item, index) => {
                if (index === editIndex) {
                    return {...item, todo_task: editText };
                }
                return item;
            });
            setTodoContainer(newArr);
            localStorage.setItem('todos', JSON.stringify(newArr));
            setEditIndex(null);
            setEditText('');
        }
    }

    return (
        <>
            {todoContainer.map((todo, index) => (
                <div className="Todo" key={index}>
                    {/* div دا معناه ان العنصر اللي انا دوست عليه هو دا اللي هعمله update غير كدا اشتغل عادي  */}
                    {editIndex === index ? (
                        <div className="flex gap-2 items-center justify-between w-full">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="border rounded p-1 outline-none update"
                            />
                            <button onClick={handleUpdate} className="adds text-white p-1 rounded">Update</button>
                        </div>
                    ) : (
                        <>
                            <p>{todo.todo_task}</p>
                            <div className='flex gap-1'>
                                <FontAwesomeIcon
                                    className='cursor-pointer'
                                    icon={faPenToSquare}
                                    onClick={() => handleEdit(index)}
                                />
                                <FontAwesomeIcon
                                    className='cursor-pointer'
                                    icon={faTrash}
                                    onClick={() => handleDelete(index)}
                                />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    )
}
