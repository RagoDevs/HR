import { useState } from "react";


function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    if (savedValue) return savedValue
}
export default function useLocalStorage () {
    
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    return [value, setValue]
}