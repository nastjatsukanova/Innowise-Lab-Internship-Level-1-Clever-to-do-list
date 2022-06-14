import moment from 'moment';
import { CHANGE_PASSWORD, CHANGE_USER_EMAIL, CHANGE_VERIFICATION_PASSWORD, SAVE_SELECTED_DAY, SAVE_TODOS } from "../constants";

const initialState = { userEmail : "", password : "", verificationPassword: "", selectedDay: String(moment().format().slice(0,10)), todos:[]};
export const rootReducer = ( state = initialState, action) => {
    switch (action.type) {
            case CHANGE_USER_EMAIL:
                return {
                    ...state,
                    userEmail: action.payload
            };
            case CHANGE_PASSWORD:
                return {
                    ...state,
                    password: action.payload
            };
            case CHANGE_VERIFICATION_PASSWORD:
                return {
                    ...state,
                    verificationPassword: action.payload
            };
            case SAVE_SELECTED_DAY:
                return {
                    ...state,
                    selectedDay: action.payload
                };
            case SAVE_TODOS:
                return {
                    ...state,
                    todos: action.payload
            }
            default:
                return state
    }
}