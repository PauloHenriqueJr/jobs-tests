import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormValidatorService } from 'src/app/core/services/custom-form-validator.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  hidePassword: boolean;
  hideNewPassword: boolean;
  hideConfirmPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private customFormValidatorService: CustomFormValidatorService,
  ) {
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        this.customFormValidatorService.patternValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { invalidEmail: true })
      ]),
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        // 1. Novo password requerido
        Validators.required,
        // 2. Tamanho minimo de 8 caracteres
        Validators.minLength(8),
        // 3. Verifica se tem algum numero na senha
        this.customFormValidatorService.patternValidator(/\d/, { hasNumber: true }),
        // 4. Verifica se tem algum caracter especial na senha
        this.customFormValidatorService.patternValidator(/\W/, { hasSpecialCharacter: true }),
        // 5. Verifica se tem alguma letra na senha
        this.customFormValidatorService.patternValidator(/[A-Za-z]/, { hasLetter: true })
      ]),
      confirmPassword: new FormControl('', Validators.required)
    },
    {
      matchPasswordvalidator: this.customFormValidatorService.matchPasswordValidator('password', 'confirmPassword')
    }
    );
    this.hidePassword = true;
    this.hideNewPassword = true;
    this.hideConfirmPassword = true;
   }

  ngOnInit(): void {
  }

  saveUser() {

  }

  newPasswordHasError() {
    let passwordControl = this.userForm.get('newPassword');
    if (
      passwordControl?.hasError('minlength') ||
      passwordControl?.hasError('hasNumber') ||
      passwordControl?.hasError('hasSpecialCharacter') ||
      passwordControl?.hasError('hasLetter') ||
      passwordControl?.hasError('hasNull')
    ) {
      return true;
    } else {
      return false;
    }
  }

}
