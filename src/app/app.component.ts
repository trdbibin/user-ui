// ✅ FILE: src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './app.component.html'
})
export class AppComponent {
  users: User[] = [];
  title = 'User Manager';
  userForm: User = { name: '', email: '' };
  isEdit = false;

  constructor(private userService: UserService) {} 

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  submitForm() {
    if (this.isEdit && this.userForm.id) {
      this.userService.updateUser(this.userForm).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    } else {
      this.userService.createUser(this.userForm).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    }
  }

  editUser(user: User) {
    this.userForm = { ...user };
    this.isEdit = true;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  resetForm() {
    this.userForm = { name: '', email: '' };
    this.isEdit = false;
  }
}
