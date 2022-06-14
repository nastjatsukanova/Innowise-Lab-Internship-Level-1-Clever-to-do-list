import { Link } from "react-router-dom";
import { SignIn } from "../SignIn/SignIn";
import { ROUTES } from '../../routes/routes';
import "./MainPage.styles.css"


export const MainPage = () => {
   return (
       <div className="main_page">
           <SignIn />
           <Link
                to={{
                    pathname: ROUTES.SIGN_UP
                }}
                className="link"
            >
                You are not registered yet?
            </Link>
       </div>

   )
};
