import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  admin = { name: 'Admin', username: 'a', password: 'a' };
  user = { name: 'User', username: 'u', password: 'u' };
  currentUser;
  isAuthenticated: boolean = false;

  constructor(private router: Router) {
    this.currentUser = { name: '', username: '', password: '' };
  }

  login(username: string, password: string) {
    if (this.admin.username === username && this.admin.password === password) {
      this.currentUser = this.admin;

      Swal.fire({
        icon: 'success',
        title: 'Welcome Admin!',
        text: 'You have successfully logged in!',
      }).then(() => {
        this.isAuthenticated = true;
        this.router.navigate(['admin']);
      });
    } else if (
      this.user.username === username &&
      this.user.password === password
    ) {
      this.currentUser = this.user;
      Swal.fire({
        icon: 'success',
        title: 'Welcome User!',
        text: 'You have successfully logged in!',
      }).then(() => {
        this.isAuthenticated = true;
        this.router.navigate(['user']);
      });
    } else {
      this.currentUser = { name: '', username: '', password: '' };
      this.isAuthenticated = false;
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        text: 'Invalid username or password!',
      });
    }
  }

  logout() {
    this.currentUser = { name: '', username: '', password: '' };
    this.isAuthenticated = false;
  }
}
