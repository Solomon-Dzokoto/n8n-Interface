import { configureStore } from "@reduxjs/toolkit"
import NodeReducer from "../reducers/NodeReducer"
import ToggleReducer from "../reducers/ToogleReducer"

export const store = configureStore({
    reducer: {
        node : NodeReducer,
        toggle: ToggleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
