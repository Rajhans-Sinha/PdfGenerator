import { Component } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
  }
}
