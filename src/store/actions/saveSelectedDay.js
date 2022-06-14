import { SAVE_SELECTED_DAY } from "../constants";

export const saveSelectedDay = (day) => {
    return {
        type: SAVE_SELECTED_DAY,
        payload: day
    };
};
