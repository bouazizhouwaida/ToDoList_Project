import { Routes } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoTemplatedrivenFormComponent } from './todo-templatedriven-form/todo-templatedriven-form.component';
import { TodoReactiveFormComponent } from './todo-reactive-form/todo-reactive-form.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component'; 

export const routes: Routes = [
  { path: 'todos', component: TodoListComponent },
  { path: 'new', component: TodoTemplatedrivenFormComponent },
  { path: 'sign-in', component: TodoReactiveFormComponent },
  { path: 'todo/:id', component: TodoDetailComponent },
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'sign-in' },
];
