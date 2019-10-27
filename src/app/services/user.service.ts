import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';
import { ITodo } from '../interfaces/itodo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiEndPoint = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  /** Get all users */
  list(): Observable<IUser[]> {
    return this.http.get(`${this.apiEndPoint}/users`).pipe(
      map(res => res as IUser[])
      // TODO: To remove map?
    );
  }

  /** Get last 5 and not completed TODOs. */
  getLastTodos(user: IUser): Observable<ITodo[]> {
    return this.http.get(`${this.apiEndPoint}/todos?userId=${user.id}&completed=false&_sort=id&_order=desc&_limit=5`).pipe(
      map(res => res as ITodo[])
    );
  }
}
