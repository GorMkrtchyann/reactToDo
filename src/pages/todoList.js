import {Button} from "../components/button";
import {useEffect, useState} from "react";

export function TodoList({lists, setToDo}){
    const [filter, setFilter] = useState()

    useEffect(() => {
        setFilter(lists)
    }, [lists])

    const deleteAllTask = () => {
        setToDo([])
    }

    const deleteAllDoneTask = () => {
        setToDo(lists?.filter(el => {return el.status === false}))
        setFilter([...lists])
    }

    const filterTasks = e => {
        switch (e.target.innerText) {
            case 'Done':
                setFilter(lists?.filter(el => {return el.status === true}))
                break;
            case 'Todo':
                setFilter(lists?.filter(el => {return el.status === false}))
                break;
            default:
                setFilter(lists)
        }
    }

    const check = e => {
        lists.map(el => {
            if (el.id === e.target.id){
                el.status = e.target.checked ? true : false
            }
            return setFilter([...lists])
        })
    }

    return(
        <div className={"todoList"}>
            <h2>TodoList</h2>
            <div className="todoList__buttons">
                <Button text={"All"} event={filterTasks}/>
                <Button text={"Done"} event={filterTasks}/>
                <Button text={"Todo"} event={filterTasks}/>
            </div>
            <div className="todoList__todos">
                {
                    filter?.map((el) => {
                        return(
                            <div key={el.id} data-status={el.status ? 'done' : 'todo'} className={"todoList__todos__item"}>
                                <label htmlFor={el.id}>{el.name}</label>
                                <div className={"todoList__todos__item__buttons"}>
                                    <input type="checkbox" id={el.id} checked={el.status ? true : false} onChange={check} />
                                    <i className="fa-solid fa-pen" style={{color: "orange"}}></i>
                                    <i className="fa-solid fa-trash" style={{color: "red"}}></i>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="todoList__buttons">
                <Button text={"Delete Done Tasks"} background={"#d61c1c"} event={deleteAllDoneTask}/>
                <Button text={"Delete All Tasks"} background={"#d61c1c"} event={deleteAllTask}/>
            </div>
        </div>
    )
}