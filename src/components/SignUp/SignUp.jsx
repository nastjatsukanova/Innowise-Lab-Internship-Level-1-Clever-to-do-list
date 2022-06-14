import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { changePassword } from "../../store/actions/changePassword";
import { changeUserEmail } from "../../store/actions/changeUserEmail";
import { changeVerificationPassword } from "../../store/actions/changeVerificationPassword";
import { Input } from "../Controls/Input/Input";
import { signUp } from "../../utils/utils";
import { Button } from "../Controls/Button/Button";
import "./SignUp.styles.css"

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector(state => state.userEmail);
    const password = useSelector(state => state.password);
    const verificationPassword = useSelector(state => state.verificationPassword);
    const [isSigned, setIsSigned] = useState(false);

    const changeUserEmailHandler = (e) => dispatch(changeUserEmail(e.target.value));
    const changePasswordHandler = (e) => dispatch(changePassword(e.target.value));
    const changeVerificationPasswordHandler = (e) => dispatch(changeVerificationPassword(e.target.value));

    const signUpHandler = () => {
        if(password.trim() && verificationPassword.trim()) {
            if (password === verificationPassword) {
                signUp(userEmail, password)
                .then(() => {
                    setIsSigned(true);
                })
                .catch((error) => {
                    alert(error.message);
                });
                
        } else {
            alert("Passwords don't match, try again");
        }
    } else {
        alert("Please, fill all the fields")
    }   
};

    useEffect(() => {
        if (isSigned) {
            return navigate(ROUTES.TASK_PAGE);
        }
    }, [isSigned]);
    
    return (
        <div className="signup_block">
            <Input className="email_input" placeholder="Enter email" onChange={changeUserEmailHandler} type="text"/>
            <Input className="password_input" placeholder="Enter password" onChange={changePasswordHandler} type="password"/>
            <Input className="password_input" placeholder="Repeat password" onChange={changeVerificationPasswordHandler} type="password"/>
            <Button className="sign_btn" type="button" title="Sign Up" onClick={signUpHandler}/>
            <Link
                to={{
                    pathname: ROUTES.MAIN_PAGE,
                }}
                className="link"
            >
                I have a profile
            </Link>
        </div>
    )
}