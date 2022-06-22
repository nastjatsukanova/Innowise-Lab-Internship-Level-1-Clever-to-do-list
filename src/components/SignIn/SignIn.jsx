import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { changePassword } from "../../store/actions/changePassword";
import { changeUserEmail } from "../../store/actions/changeUserEmail";
import { Input } from "../Controls/Input/Input";
import { signIn } from "../../utils/utils"
import { Button } from "../Controls/Button/Button";
import { useInput } from "../AddTaskPage/useInput";
import "./SignIn.styles.css";

export const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useInput();
    const password = useInput();
    const [isSigned, setIsSigned] = useState(false);

    const signInHandler = () => {
        dispatch(changeUserEmail(userEmail.value));
        dispatch(changePassword(password.value));
        signIn(userEmail.value, password.value)
            .then(() => setIsSigned(true))
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        if (isSigned) {
            return navigate(ROUTES.TASK_PAGE);
        }
    }, [isSigned]);

    return (
        <div className="signin_block">
            <Input className="email_input" placeholder="Enter email" onChange={userEmail.changeInputHandler} type="text" value={userEmail.value}/>
            <Input className="password_input" placeholder="Enter password" onChange={password.changeInputHandler} type="password" value={password.value}/>
            <Button className="sign_btn" type="button" title="Sign In" onClick={signInHandler}/>
        </div>
    )
}