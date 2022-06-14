import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSelectedDay } from "../../store/actions/saveSelectedDay";
import "./DateItem.styles.css";

export const DateItem = ({day, weekDay, value }) => {
    const dispatch = useDispatch();
    const selectedDay = useSelector(state => state.selectedDay);
    const todos = useSelector(state => state.todos);
    const [ completeTask, setCompleteTask] = useState(false);
    const [ uncompleteTask, setUncompleteTask] = useState(false);

    const setCheckedDay = (e) => {
        const checkedDay = e.target;
        dispatch(saveSelectedDay(checkedDay.getAttribute("value")));
    };

    useEffect(() => {
        todos.forEach(item => {
            if(item.date === value){
                if (item.done){
                    setCompleteTask(true);
                } else{
                    setUncompleteTask(true);
                }
            }
        })
    },[todos]);

    return (
        <div>
            <div className={ selectedDay === value ? "date_item checked" :"date_item" } onClick={setCheckedDay}  >
            <div className={ selectedDay === value ? "date_text checked" :"date_text" } value={value}>
                {weekDay}
                <br/>
                {day}
            </div>
        </div>
            <div className='dotts'>
                {uncompleteTask && <div className='uncomplete_dott'/>}
                {completeTask && <div className='complete_dott'/>}
            </div>
        </div>
    )
};
