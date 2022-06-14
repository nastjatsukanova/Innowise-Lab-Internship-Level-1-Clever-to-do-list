import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { Button } from "../Controls/Button/Button";
import { Input } from "../Controls/Input/Input";
import { ROUTES } from "../../routes/routes";
import { generateID } from "../../utils/utils";
import { saveTodos } from "../../store/actions/saveTodos";
import "./AddTaskPage.styles.css";

export const AddTaskPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const db = getDatabase();
    const todos = useSelector(state => state.todos);
    const userEmail = useSelector(state => state.userEmail);
    const selectedDay = useSelector(state => state.selectedDay);
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [showMassage, setShowMessage] = useState(false);

    const setTaskTitleHandler = (e) => setTaskTitle(e.target.value);

    const setTaskDescriptionHandler = (e) => setTaskDescription(e.target.value);

    const addTask = () => {
        if (taskTitle.trim() && taskDescription.trim()){
            const todo = {
                id:generateID(),
                title: taskTitle,
                description: taskDescription,
                date: selectedDay,
                created_by: userEmail,
                done: false
            };
            (set(ref(db, "todos/"), [...todos, todo]));
            dispatch(saveTodos([...todos, todo]));
            setTaskTitle("");
            setTaskDescription("");
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
            <Input className="task_title" onChange={setTaskTitleHandler} type="text" placeholder="Enter title" value={taskTitle}/>
            <label>Add description</label>
            <textarea className="task_descritpion" placeholder="Enter descritpion" rows="5" cols="30" onChange={setTaskDescriptionHandler} value={taskDescription}>d</textarea>
            <Button className="add_btn" type="button" title="Add new task" onClick={addTask}/>
            {showMassage && <div className="message">Task is added successfully!</div>}
        </div>
    )
}