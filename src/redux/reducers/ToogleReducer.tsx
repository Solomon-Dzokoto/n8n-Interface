import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  extend : false,
  showModal : false,
}
const toggleReducer = createSlice({
    name:"toggle",
    initialState,
    reducers: {
        toggleExtend : (state)=> {
         state.extend = !state
        },
        toggleModal : (state,action)=>{
            state.showModal = action.payload
        }
    }
})

export const {toggleExtend, toggleModal,  } = toggleReducer.actions;

export default toggleReducer.reducer;