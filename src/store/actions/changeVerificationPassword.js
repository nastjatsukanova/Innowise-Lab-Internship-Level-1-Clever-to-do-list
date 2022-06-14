import { CHANGE_VERIFICATION_PASSWORD} from "../constants"

export const changeVerificationPassword = (string) => {
    return {
        type: CHANGE_VERIFICATION_PASSWORD,
        payload: string
    }
};