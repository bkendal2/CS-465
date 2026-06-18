import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  public user: User = new User();
  public password: string = '';
  public formError: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';

    if (!this.user.email || !this.password) {
      this.formError = 'All fields are required.';
      return;
    }

    this.authenticationService.login(this.user, this.password).subscribe({
      next: (authResp) => {
        this.authenticationService.saveToken(authResp.token);
        this.router.navigate(['']);
      },
      error: () => {
        this.formError = 'Login failed. Please try again.';
      }
    });
  }
}