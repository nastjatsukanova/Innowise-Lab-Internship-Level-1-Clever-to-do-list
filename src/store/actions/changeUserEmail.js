import { CHANGE_USER_EMAIL } from "../constants"

export const changeUserEmail = (string) => {
    return {
        type: CHANGE_USER_EMAIL,
        payload: string
    }
};
