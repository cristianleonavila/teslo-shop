import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {

  private fb = inject(FormBuilder);

  private router = inject(Router);

  authService = inject(AuthService);

  hasError = signal(false);

  isPosting = signal(false);


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login () {
    if ( this.form.invalid ) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const { email, password } = this.form.value;
    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if ( isAuthenticated ) {
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
    });
  }

  checkAuthentication() {

  }



}
