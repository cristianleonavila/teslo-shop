import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, JsonPipe],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {

  authService = inject(AuthService);


}
