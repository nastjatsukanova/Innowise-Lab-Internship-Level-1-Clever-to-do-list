import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { changePassword } from "../../store/actions/changePassword";
import { changeUserEmail } from "../../store/actions/changeUserEmail";
import { Input } from "../Controls/Input/Input";
import { signIn } from "../../utils/utils"
import { Button } from "../Controls/Button/Button";
import "./SignIn.styles.css";

export const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector(state => state.userEmail);
    const password = useSelector(state => state.password);
    const [isSigned, setIsSigned] = useState(false);

    const changeUserEmailHandler = (e) => dispatch(changeUserEmail(e.target.value));
    const changePasswordHandler = (e) => dispatch(changePassword(e.target.value));

    const signInHandler = () => {
        signIn(userEmail, password)
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
            <Input className="email_input" placeholder="Enter email" onChange={changeUserEmailHandler} type="text"/>
            <Input className="password_input" placeholder="Enter password" onChange={changePasswordHandler} type="password"/>
            <Button className="sign_btn" type="button" title="Sign In" onClick={signInHandler}/>
        </div>
    )
}