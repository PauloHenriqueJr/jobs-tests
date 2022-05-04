import { Component, OnInit } from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {Moment} from "moment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users: IUser[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  // metodo que cria um array de usuarios
  onNewUser(user: IUser) {
    this.users = [...this.users, user];
  }
  // metodo que remove um usuario do array
  onUserRemoved(index: Moment) {
    this.users.forEach((user, i) => {
      if (user.index === index)
        this.users.splice(i, 1);
    });
    this.users = [...this.users];
  }

}
