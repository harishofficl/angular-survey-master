import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private router: Router, private auth: AuthService) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.auth.login(this.username, this.password);
  }
  
}
