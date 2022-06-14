import { SAVE_TODOS } from "../constants";

export const saveTodos = (array) => {
    return {
        type: SAVE_TODOS,
        payload: array
    };
};