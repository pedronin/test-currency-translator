import { AppDispatch, RootState } from '../redux/stote';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector