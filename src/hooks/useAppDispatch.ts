import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store'; // Adjust the path according to your project structure

export const useAppDispatch: () => AppDispatch = useDispatch;
