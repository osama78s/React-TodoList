import React, { useState } from 'react'
import { TodoForm } from './TodoForm'

export const TodoWraper = () => {

  return (
    <div className='TodoWrapper'>
        <h1 className='text-center'>Get Things Done!</h1>
        <TodoForm/>
    </div>
  )
}
