import { Component, Input, Output, EventEmitter } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
import { Todo } from '../todo.service'; 

@Component({
  selector: 'app-update-todo',
  standalone: true,
  imports: [
    CommonModule,         
    ReactiveFormsModule,  
  ],
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css'],
})
export class UpdateTodoComponent {
  @Input() todo!: Todo; 
  @Output() close = new EventEmitter<void>(); 
  @Output() todoUpdated = new EventEmitter<Todo>(); 

  updateForm!: FormGroup; 

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [this.todo?.title || '', [Validators.required, Validators.maxLength(50)]],
      date: [this.todo?.date || '', [Validators.required]],
      description: [this.todo?.description || '', [Validators.maxLength(200)]],
      completed: [this.todo?.completed || false, [Validators.required]], 
    });
  }


  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedTodo: Todo = { ...this.todo, ...this.updateForm.value }; 
      console.log('Todo mis à jour (enfant):', updatedTodo); 
      this.todoUpdated.emit(updatedTodo); 
    }
  }


  closeModal(): void {
    this.close.emit(); 
  }
}
