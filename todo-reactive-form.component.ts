import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-todo-reactive-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './todo-reactive-form.component.html',
  styleUrls: ['./todo-reactive-form.component.css'],
})
export class TodoReactiveFormComponent implements OnInit {
  authForm!: FormGroup; 
  loginError: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }


    const { login, password } = this.authForm.value;

    this.authService.login(login, password).subscribe(
      (success) => {
        if (success) {
          this.router.navigate(['/todos']);
        } else {
          this.loginError = 'Invalid login or password. Please try again.';
        }
      },
      (error) => {
        console.error('Login error:', error);
        this.loginError = 'An error occurred. Please try again later.';
      }
    );
  }
}
