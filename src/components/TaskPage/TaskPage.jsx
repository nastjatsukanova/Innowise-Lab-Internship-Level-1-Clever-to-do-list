import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, get, child} from "firebase/database";
import { ROUTES } from '../../routes/routes';
import { generateID } from '../../utils/utils';
import { Button } from "../Controls/Button/Button";
import { DateItem } from "../DateItem/DateItem";
import { saveTodos } from '../../store/actions/saveTodos';
import { TodoItem } from '../TodoItem/TodoItem';
import "./TaskPage.styles.css";

export const TaskPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentDate = moment();
    const todos = useSelector(state => state.todos);
    const userEmail = useSelector(state => state.userEmail);
    const selectedDay = useSelector(state => state.selectedDay);

    const days = [{
        id: generateID(),
        weekDay: currentDate.format('llll').split(",")[0],
        date: currentDate.format('llll').split(",")[1].split(" ")[2],
        value: currentDate.format("").slice(0,10)
    }];

    const createDates = () => {
        for(let i = 1; i < 32; i++){
            const nextDate = moment().add(i,'days'); 
            const nextDay = {
                id: generateID() + i,
                weekDay: nextDate.format('llll').split(",")[0],
                date: nextDate.format('llll').split(",")[1].split(" ")[2],
                value: nextDate.format().slice(0,10)
            };
            days.push(nextDay);
        };
    };
    createDates();

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "todos"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const todo = Object.values(snapshot.val());
                    dispatch(saveTodos(todo));
                }
            })
            .catch((error) => {
                alert(`${error}`);
            });
    },[]);

    const turnToAddTask = () => navigate(ROUTES.ADD_TASK);
    const turnToSignIn  = () => navigate(ROUTES.MAIN_PAGE);

    return (
        <div className="task_page">
           <Button className="turn_btn" onClick={turnToSignIn} type="button" title="<"/> 
           <div className='days_block' >
                {days && days.map(item => {
                    return (
                        <DateItem
                        key={item.id}
                        day={item.date}
                        weekDay={item.weekDay}
                        value={item.value}
                        />
                    )
                   
                })}
           </div>
           <div className="todo_list">
           {todos && todos.map(item => {
               if(item.created_by === userEmail){
                   if(item.date === selectedDay){
                    return (
                        <TodoItem 
                         key={item.id}
                         title={item.title}
                         description={item.description}
                         done={item.done}
                         id={item.id}
                        />
                    )
                   }
               }
           })}
           </div>
            <Button className="add_btn" type="button" title="+ Add new task" onClick={turnToAddTask} />
        </div>
    )
};
