import { ITodo } from './itodo';

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    todos?: ITodo[];
}
