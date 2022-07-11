import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        list: []
    },
    reducers: {
        handleAddToDo: (state, action) => {
            let listLength = state.list.length;
            const newJob = {
                jobID: listLength === 0 ? 0 : state.list[listLength - 1].jobID + 1,
                name: action.payload,
                isDone: false,
            }
            state.list = [...state.list, newJob]

        },
        handleToggleToDo: (state, action) => {
            const listTemp = [...state.list];
            for (let i = 0; i < listTemp.length; i++) {
                if (listTemp[i].jobID === action.payload) {
                    listTemp[i].isDone = !listTemp[i].isDone;
                }
            }
            state.list = listTemp;
        },
        handleDeleteToDo: (state, action) => {
            const listTemp = [...state.list];
            const valueToDelete = action.payload;
            const newList = listTemp.filter(item => item.jobID !== valueToDelete);
            state.list = newList;

        }

    }
})
export const { handleAddToDo, handleToggleToDo, handleDeleteToDo } = todoSlice.actions;
export default todoSlice.reducer;