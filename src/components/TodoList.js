import React, { useEffect, useState } from 'react'



const TodoList = () => {

    const [todoList, setTodoList] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const getTodoList = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const parsedData = await response.json()
            setTodoList(parsedData)
            console.log(JSON.stringify(parsedData))
        }

        getTodoList()
    }, [])

    useEffect(() => {
        console.log('Todo List has changed')
    }, [todoList])

    const addNewElement = (e) => {
        e.preventDefault();

        if (title === '') return

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const tempTodoList = todoList
        tempTodoList.unshift({ title: formJson.title, userId: 1, completed: false, id: Math.floor(Math.random() * 999) })
        setTodoList([...tempTodoList])

        setTitle('')

    }

    return (
        <form onSubmit={addNewElement} >
            <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    {
                        todoList.map((todoItem, index) => {
                            return (
                                <div key={index} style={{ backgroundColor: 'rgba(0,0,0,.1)', padding: 10, borderRadius: 5, marginTop: 10 }}>
                                    <h2>{todoItem.title}</h2>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <p>Completed:</p>
                                        <div style={{ height: 20, width: 20, backgroundColor: todoItem.completed ? 'green' : 'red', borderRadius: 20, marginLeft: 20 }} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div style={{ display: 'grid', height: 200 }}>
                    <h2>Add new element</h2>
                    <label>
                        Title: <input name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                    </label>
                    <button type='submit'>Add</button>
                </div>
            </div>
        </form>
    )
}

export default TodoList