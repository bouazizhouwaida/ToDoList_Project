import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { TodoService, Todo } from '../todo.service'; 
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-todo-detail',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent {
  @Input() todo!: Todo;
  @Output() close = new EventEmitter<void>();

  faCheck = faCheck;

  constructor(private todoService: TodoService) {}

  closeModal() {
    this.close.emit(); 
  }

  toggleDone() {
    if (this.todo) {
      this.todo.completed = !this.todo.completed; 

    }
  }

}
