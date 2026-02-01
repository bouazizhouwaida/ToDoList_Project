import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TodoService, Todo } from '../todo.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faList, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { TodoTemplatedrivenFormComponent } from '../todo-templatedriven-form/todo-templatedriven-form.component';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    FontAwesomeModule,
    TodoDetailComponent,
    TodoTemplatedrivenFormComponent,
    UpdateTodoComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = []; // Liste des todos
  faList = faList; // Icone pour afficher les détails
  faPenToSquare = faPenToSquare; // Icone pour éditer un todo
  faTrash = faTrash; // Icone pour supprimer un todo

  // Variables pour gérer les modales
  selectedTodo: Todo | null = null; // Sélectionner un todo pour afficher ses détails
  selectedTodoUpdate: Todo | null = null; // Sélectionner un todo pour le mettre à jour

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Charger la liste des todos au chargement du composant
    this.loadTodos();
  }

  // Charger tous les todos depuis le serveur
  loadTodos(): void {
    this.todoService.getTodos().subscribe(
      (data) => {
        this.todos = data; // Récupérer les todos depuis le backend
      },
      (error) => {
        console.error('Erreur lors du chargement des todos :', error);
        alert('Impossible de charger les todos. Vérifiez le serveur.');
      }
    );
  }

  // Afficher les détails d'un todo dans une modale
  displayTodoDetail(todo: Todo): void {
    this.selectedTodo = todo;
  }

  // Supprimer un todo
  deleteTodo(todo: Todo): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${todo.title}" ?`)) {
      this.todoService.deleteTodo(todo.id).subscribe(
        () => {
          this.todos = this.todos.filter((t) => t.id !== todo.id); // Retirer le todo supprimé de la liste
        },
        (error) => {
          console.error('Erreur lors de la suppression du todo :', error);
          alert('Impossible de supprimer le todo. Vérifiez si l’ID existe sur le serveur.');
        }
      );
    }
  }

  // Actualiser la liste lorsque de nouvelles tâches sont ajoutées
  onTaskAdded(): void {
    this.loadTodos(); // Recharger la liste
  }

  // Ouvrir la modale d'édition pour un todo spécifique
  openUpdateModal(todo: Todo): void {
    if (todo) {
      this.selectedTodoUpdate = todo;
    } else {
      console.error('Todo is null or undefined');
    }
  }

  // Fermer les modales
  closeModal(): void {
    this.selectedTodo = null;
    this.selectedTodoUpdate = null;
  }

  // Gérer la mise à jour du todo
  onTodoUpdated(updatedTodo: Todo): void {
    if (!updatedTodo) {
      console.error('Le todo mis à jour est null ou undefined');
      return;
    }

    console.log('Todo mis à jour reçu dans le parent :', updatedTodo);
    
    this.todoService.updateTodo(updatedTodo).subscribe({
      next: () => {
        console.log('Mise à jour réussie dans le backend');
        this.loadTodos(); // Recharger la liste des todos après la mise à jour
        this.closeModal(); // Fermer la modale de mise à jour
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du todo :', err);
        alert("Une erreur s'est produite lors de la mise à jour.");
      },
    });
  }
}
