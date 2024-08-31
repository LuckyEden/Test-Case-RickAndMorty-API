 
 
// ==============================|| COMBINE REDUCER ||============================== //

import { combineReducers, configureStore, Selector } from "@reduxjs/toolkit";

// Reducers
import serviceReducer from "./reducers/serviceReducer";

const reducer = combineReducers({
    service: serviceReducer
});


const store = configureStore({
    reducer
});


const action = (type: string, payload: any) => store.dispatch({ type, payload });
const useAppDispatch = () => store.dispatch;
const useSelector = <T>(selector: Selector<any, T>) => selector(store.getState());

export default store;

export {
    reducer,
    action
}