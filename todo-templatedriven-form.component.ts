import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService, Todo } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-todo-templatedriven-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './todo-templatedriven-form.component.html',
  styleUrls: ['./todo-templatedriven-form.component.css'],
  providers: [TodoService],
})
export class TodoTemplatedrivenFormComponent {
  newTodo: Todo = {
    id: '', 
    title: '',
    description: '',
    date: new Date(),
    completed: false,
  };

  @Output() taskAdded = new EventEmitter<void>(); 

  constructor(private todoService: TodoService) {}

  onSubmit(todoForm: NgForm) {
    if (todoForm.valid) {
      this.newTodo.id = uuidv4();


      this.newTodo.date = new Date(todoForm.value.date);

      this.todoService.addTodo(this.newTodo).subscribe(() => {
        alert('Task added successfully!');
        this.taskAdded.emit(); 
        todoForm.resetForm({
          title: '',
          description: '',
          date: '',
          completed: false,
        });
        this.closeModal();
      });
    }
  }

  closeModal() {
    const modal = document.getElementById('todoModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }

  
}
