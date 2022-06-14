import { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { saveTodos } from '../../store/actions/saveTodos';
import { ROUTES } from "../../routes/routes";
import { Button } from "../Controls/Button/Button";
import { Input } from "../Controls/Input/Input";
import "./Description.styles.css";

export const Description = () => {
    const location = useLocation();
    const { todo } = location.state;
    const [titleValue, setTitleValue] = useState(todo.title);
    const [ descriptionValue, setDescriptionValue ] = useState(todo.description)
    const navigate = useNavigate();
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const db = getDatabase();
    const [messageDelete, setMessageDelete] = useState(false);
    const [messageComplete, setMessageComplete] = useState(false);

    const completeTodo = () => {
        const completed = [...todos.map(item => {
            if (todo.id === item.id){
                return { ...item, done: !item.done};
            }
            return item;
        })];
        setMessageComplete(true);
        (set(ref(db, "todos/"), completed));
        dispatch(saveTodos(completed));
    };
    
     const deleteTodo = () => {
        const deleted = [...todos.filter(item => item.id !== todo.id)];
        setMessageDelete(true);
        (set(ref(db, "todos/"), deleted));
        dispatch(saveTodos(deleted));
        setDescriptionValue("");
        setTitleValue("");
    };

    const changeTodoTitle = (e) => {
        setTitleValue(e.target.value);
        const changedTitle  = [...todos.map(item => {
            if(todo.id === item.id) {
                return {...item, title: e.target.value};
            }
            return item;
        })];
        (set(ref(db, "todos/"), changedTitle));
        dispatch(saveTodos(changedTitle))
    };

    const changeTodoDescritpion = (e) => {
        setDescriptionValue(e.target.value);
        const changedDescription  = [...todos.map(item => {
            if(todo.id === item.id) {
                return {...item, description: e.target.value}
            }
            return item;
        })];
        dispatch(saveTodos(changedDescription));
        (set(ref(db, "todos/"), changedDescription));
        
    };


    const turnToTaskPage = () => navigate(ROUTES.TASK_PAGE);

    useEffect(() => {
        setTimeout(() => {
            setMessageDelete(false);
            setMessageComplete(false)
        }, 4000)
    },[messageDelete, messageComplete]);

    return (
        <div className="description_block">
            <Button onClick={turnToTaskPage} className="turn_btn" title="<"/>
            <Input className="description_title" value={titleValue} onChange={changeTodoTitle} type="text"/>
            <textarea className="description" value={descriptionValue} onChange={changeTodoDescritpion} id={todo.id} >
                {todo.description}
            </textarea>
            <div className="buttons_block">
            <Button onClick={completeTodo} className="complete_btn" title={todo.checked ? "Uncomplete" : "Complete"}/>
            <Button onClick={deleteTodo} className="delete_btn" title="Delete"/>
            <Button onClick={turnToTaskPage} className="update_btn" title="Update"/>
            </div>
                {messageDelete && <div className="message">Task was deleted!</div>} 
                {messageComplete && <div className="message">Task was {todo.checked ? "Uncomplete" : "Complete"}!</div>}
        </div>
    )
}