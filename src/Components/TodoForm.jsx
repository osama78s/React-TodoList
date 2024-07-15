import React, { useEffect, useState } from 'react';
import { TodoItems } from './TodoItems';

export const TodoForm = () => {

    const [todo, setTodo] = useState({
        todo_task: ''
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
            setTodoContainer([...todoContainer ,todo]);
            setTodo({todo_task: ''});
        }
    }

    useEffect(() => {
        if (todoContainer.length > 0){
            localStorage.setItem('todos', JSON.stringify(todoContainer))
        }
    }, [todoContainer])



    // const [todo, setTodo] = useState({
    //     todo_task: '',
    // });

    // const [todoContainer, setTodoContainer] = useState([]);

    // // تحميل المهام من local storage عند تحميل الصفحة
    // useEffect(() => {
    //     const savedTodos = localStorage.getItem('todos');
    //     if (savedTodos) {
    //         setTodoContainer(JSON.parse(savedTodos));
    //     }
    // }, []);

    // // حفظ المهام في local storage عند تحديث قائمة المهام
    // useEffect(() => {
    //     if (todoContainer.length > 0) {
    //         localStorage.setItem('todos', JSON.stringify(todoContainer));
    //     }
    // }, [todoContainer]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (todo.todo_task.trim()) {  // تأكد من أن المهمة ليست فارغة
    //         setTodoContainer([...todoContainer, todo]);
    //         setTodo({ todo_task: '' }); // مسح حقل الإدخال
    //     }
    // };


    return (
        <>
            <form className='TodoForm' onSubmit={handleSubmit}>
                <input 
                    onChange={(e) => setTodo({ todo_task: e.target.value })} 
                    value={todo.todo_task}  // تأكد من ربط القيمة بالحالة
                    type="text" 
                    className='todo-input mb-3 sm:mb-8' 
                    placeholder='What Is Task Today?' 
                />
                <button type='submit' className='todo-btn block mx-auto mb-10 sm:mx-0 sm:mb-0 sm:inline-block'>Add Task</button>
            </form>
            <TodoItems todoContainer={todoContainer} setTodoContainer={setTodoContainer}/>
        </>
    );
};
