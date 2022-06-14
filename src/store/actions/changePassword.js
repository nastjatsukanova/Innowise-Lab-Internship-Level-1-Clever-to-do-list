import { CHANGE_PASSWORD} from "../constants"

export const changePassword = (string) => {
    return {
        type: CHANGE_PASSWORD,
        payload: string
    }
};
