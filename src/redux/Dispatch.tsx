import { useDispatch } from "react-redux"
import { AppDispatch } from "./store/store"

const Dispatch = () => {
 const dispatch = useDispatch<AppDispatch>()
  return dispatch 
}

export default Dispatch
