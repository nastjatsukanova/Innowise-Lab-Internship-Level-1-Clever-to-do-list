import { useCallback, useState } from "react"

export const useInput = () => {
    const [value, setValue] = useState("");

    const changeInputHandler = useCallback((e) => {
        setValue(e.target.value);
    },[setValue]);

    const reset = () => {
        setValue('')
    }
    return {
        value,
        changeInputHandler,
        reset
    }
};
