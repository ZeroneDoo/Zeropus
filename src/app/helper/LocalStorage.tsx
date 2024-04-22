export const storeData = (key, value) => {
    try {
        if(typeof value === "string") {
            localStorage.setItem(key, value)
        }else{
            const asyncValue = JSON.stringify(value);
            localStorage.setItem(key, asyncValue)
        }
    } catch (error) {
        console.log(error)
    }
}

export const getData = (key) => {
    try {
        const asyncValue = localStorage.getItem(key);
        return asyncValue !== null ? JSON.parse(asyncValue) : null;
    } catch (error) {
        console.log(error)
    }
}

export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.log(error)
    }
    
} 