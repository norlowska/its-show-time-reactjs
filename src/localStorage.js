export const loadState = (item) => {
    try {
        const serializedState = localStorage.getItem(item)
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState).USER_MOVIES;
    } catch (error) {
        return undefined;
    }
};

export const saveState = (state, item) => {
    try {
        const serializedState = JSON.stringify(state);
        if(serializedState !== localStorage.getItem(item)){
            localStorage.setItem(item, serializedState);
        }
    } catch (error) {
        console.log(error);
    }
}