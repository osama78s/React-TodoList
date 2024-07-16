import React, { useEffect, useState } from 'react';
import { TodoItems } from './TodoItems';

export const TodoForm = () => {

    const [todo, setTodo] = useState({
        todo_task: '',
        completed: false
    })

    const [todoContainer, setTodoContainer] = useState([]);

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos){
            setTodoContainer(JSON.parse(savedTodos));
        }
    }, [])

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.todo_task.trim()){
            setTodoContainer([...todoContainer ,{ ...todo, completed: false }]);
            setTodo({todo_task: '', completed: false});
        }
    }

    useEffect(() => {
        if (todoContainer.length > 0){
            localStorage.setItem('todos', JSON.stringify(todoContainer))
        }
    }, [todoContainer])


    return (
        <>
            <form className='TodoForm' onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setTodo({ todo_task: e.target.value })} 
                    value={todo.todo_task} 
                    type="text" 
                    className='todo-input mb-3 sm:mb-8 capitalize' 
                    placeholder='What Is Task Today?' 
                />
                <button type='submit' className='todo-btn block mx-auto mb-10 sm:mx-0 sm:mb-0 sm:inline-block'>Add Task</button>
            </form>
            <TodoItems todo={todo} todoContainer={todoContainer} setTodoContainer={setTodoContainer}/>
        </>
    );
};
