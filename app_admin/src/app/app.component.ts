import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin';

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }
}