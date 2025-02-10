import { createSlice } from "@reduxjs/toolkit";

interface Node {
    id: string;
    // add other properties as needed
}



const nodeSlice = createSlice({
    name: "node",
    initialState: [] as Node[],
    reducers: {
        addNode: (state, action) => {
            state.push(action.payload);
        },
        removeNode: (state, action) => {
            state.splice(action.payload, 1);
        },
        updateNode: (state, action) => {
            const index = state.findIndex(node => node.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    }
})

export const { addNode, removeNode, updateNode } = nodeSlice.actions;
export default nodeSlice.reducer;