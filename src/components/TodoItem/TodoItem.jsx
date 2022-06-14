import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { ROUTES } from '../../routes/routes';
import { Input } from "../Controls/Input/Input";
import { saveTodos } from '../../store/actions/saveTodos';
import "./TodoItem.styles.css";

export const TodoItem = ({done, title, description,id }) => {
    const [checked, setChecked] = useState(done);
    const dispatch = useDispatch();
    const db = getDatabase();
    const todos = useSelector(state => state.todos)

    const completeTodo = () => {
        const completed = [...todos.map(item => {
            if (id === item.id){
                return { ...item, done: !item.done};
            }
            return item;
        })];
        (set(ref(db, "todos/"), completed));
        dispatch(saveTodos(completed));
    };
    const setCheckedHandler = () => setChecked(!checked);

    return (
        <div className={checked ? 'item_checked' : 'todo_item'} >
            <Input type="checkbox" className="checkbox" onChange={setCheckedHandler} checked={checked} id={id} onClick={completeTodo} />
            <label htmlFor={id} className="todo_title">{title}</label>
            <Link
                to={{
                    pathname: ROUTES.DESCRIPTION,

                }}
                state={{
                    todo: {
                        title,
                        description,
                        done,
                        id,
                        checked
                    }
                }}
                className="todo_link"
            />
        </div>
    )
}