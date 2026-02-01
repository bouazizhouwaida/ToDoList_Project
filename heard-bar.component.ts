import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service';
import { TodoTemplatedrivenFormComponent } from '../todo-templatedriven-form/todo-templatedriven-form.component';
import { Subscription } from 'rxjs'; 

@Component({
  selector: 'app-heard-bar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    RouterLink,
    RouterLinkActive,
    TodoTemplatedrivenFormComponent 
  ],
  templateUrl: './heard-bar.component.html',
  styleUrls: ['./heard-bar.component.css'],
  providers: [AuthService]
})
export class HeardBarComponent implements OnInit, OnDestroy {
  isLoggedIn = false; 
  isLoginPage = false;
  private subscription: Subscription = new Subscription(); 

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/sign-in'; 
        this.isLoggedIn = this.authService.isAuthenticated(); 
      }
    });


    this.subscription.add(routerSubscription);
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/sign-in']);
  }

  openModal(): void {
    const modal = document.querySelector('#todoModal') as HTMLElement | null; 
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('style', 'display: block;');
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
