import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const TodoItems = ({ todo, todoContainer, setTodoContainer }) => {

    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const handleDelete = (id) => {
        const newArr = todoContainer.filter((item, index) => index !== id);
        setTodoContainer(newArr);
        localStorage.setItem('todos', JSON.stringify(newArr));
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        
    }

    const handleUpdate = () => {
        if (editText !== ''){
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
    }
    const handelCompleted = (index) => {
        const newArr = todoContainer.map((item, idx) => {
            if (index === idx){
                return { ...item, completed: !item.completed };
            }
            return item;
        })
        setTodoContainer(newArr)
    }

    return (
        <>
            {todoContainer.map((todo, index) => (
                <div  className={`${todo.completed ? 'opacity-40' : 'opacity-100'} Todo`} key={index}>
                    {/* div دا معناه ان العنصر اللي انا دوست عليه هو دا اللي هعمله update غير كدا اشتغل عادي  */}
                    {editIndex === index ? (
                        <div className="flex gap-2 items-center justify-between w-full">
                            <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 border rounded p-1 outline-none update capitalize"
                            />
                            <button onClick={handleUpdate} className="adds text-white p-1 rounded">Update</button>
                        </div>
                    ) : (
                        <>
                            <p className={`${todo.completed ? 'up' : 'text-white'} capitalize des cursor-pointer`} onClick={() => handelCompleted(index)}>{todo.todo_task}</p>
                            <div className='felx gap-1'>
                                <FontAwesomeIcon
                                    className={`${todo.completed ? 'hidden' : 'inline-block'} cursor-pointer`}
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
