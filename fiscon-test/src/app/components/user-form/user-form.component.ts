import {Component, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from '../../interfaces/IUser';
import * as moment from "moment";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Output() newUserEvent = new EventEmitter<IUser>();

  // formulario

  userForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    telefone: new FormControl('', [Validators.required, Validators.maxLength(16)])
  });

  // eventos de submit do formulario e limpeza do formulario
  onSubmit() {
    let user: IUser = this.userForm.value;
    user.index = moment();

    this.newUserEvent.emit(user);
    this.userForm.reset();
  }

  onClean() {
    this.userForm.reset();
  }
}
