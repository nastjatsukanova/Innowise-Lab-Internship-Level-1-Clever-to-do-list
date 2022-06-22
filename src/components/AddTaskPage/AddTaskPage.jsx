import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { Button } from "../Controls/Button/Button";
import { Input } from "../Controls/Input/Input";
import { ROUTES } from "../../routes/routes";
import { generateID } from "../../utils/utils";
import { saveTodos } from "../../store/actions/saveTodos";
import { useInput } from "./useInput";
import "./AddTaskPage.styles.css";

export const AddTaskPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const db = getDatabase();
    const todos = useSelector(state => state.todos);
    const userEmail = useSelector(state => state.userEmail);
    const selectedDay = useSelector(state => state.selectedDay);
    const [showMassage, setShowMessage] = useState(false);
    const title = useInput();
    const description = useInput();

    const addTask = () => {
        if (title.value.trim() && description.value.trim()){
            const todo = {
                id:generateID(),
                title: title.value,
                description: description.value,
                date: selectedDay,
                created_by: userEmail,
                done: false
            };
            title.reset();
            description.reset();
            (set(ref(db, "todos/"), [...todos, todo]));
            dispatch(saveTodos([...todos, todo]));
            setShowMessage(true);
        }
        else alert("Please, fill all fields");
    };
    const turnToTaskPage = () => navigate(ROUTES.TASK_PAGE);
    
    useEffect(() => {
        setTimeout(() => {
            setShowMessage(false)
        }, 2000)
    },[showMassage]);

    return(
        <div className="add_task_block">
            <Button onClick={turnToTaskPage} className="turn_btn" title="<"/>
            <label>Add title of the task</label>
            <Input className="task_title" onChange={title.changeInputHandler} type="text" placeholder="Enter title" value={title.value}/>
            <label>Add description</label>
            <textarea className="task_descritpion" placeholder="Enter descritpion" rows="5" cols="30" onChange={description.changeInputHandler} value={description.value} />
            <Button className="add_btn" type="button" title="Add new task" onClick={addTask}/>
            {showMassage && <div className="message">Task is added successfully!</div>}
        </div>
    )
}