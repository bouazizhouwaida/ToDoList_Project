import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid'; 


export interface Todo {
  id: string; 
  title: string;
  completed: boolean;
  date: Date;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) {}

  generateUniqueId(): string {
    return uuidv4(); 
  }



  addTodo(todo: Todo): Observable<Todo> {
    todo.id = this.generateUniqueId();
    return this.http.post<Todo>(this.apiUrl, todo);
  }

    updateTodo(todo: Todo): Observable<Todo> {
      return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
    }
  

    getTodos(): Observable<Todo[]> {
      return this.http.get<Todo[]>(this.apiUrl);
    }


  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTodoById(id: string): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }
}
