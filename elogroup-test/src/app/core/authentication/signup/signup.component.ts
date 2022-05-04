import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/modules/user/user-model';
import { CustomFormValidatorService } from '../../services/custom-form-validator.service';
import { FakeBackendService } from '../../services/fake-backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hideConfirmPassword: boolean;
  hidePassword: boolean;
  takenUserError: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private customFormValidatorService: CustomFormValidatorService,
    private fakeBackendService: FakeBackendService,
    private router: Router
  ) {

    //criando o formulario de login com validacao em regex para registro
    this.signupForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        this.customFormValidatorService.patternValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { invalidEmail: true })
      ]),

      //checando se a senha é valida para registro e se tem letra, numero e caracter especial
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.customFormValidatorService.patternValidator(/\d/, { hasNumber: true }),
        this.customFormValidatorService.patternValidator(/\W/, { hasSpecialCharacter: true }),
        this.customFormValidatorService.patternValidator(/[A-Za-z]/, { hasLetter: true })
      ]),
      confirmPassword: new FormControl('', Validators.required)
    });

    //guardando o valor do campo confirmar senha como verdadeiro caso passar pelo validator
    this.hideConfirmPassword = true;
    this.hidePassword = true;
    this.takenUserError = false;

  }

  ngOnInit(): void {
  }

  //registrando usuario e redirecionando para a pagina de login
  register() {
    if (this.signupForm.valid) {
      let newUser: UserModel = new UserModel(
        this.signupForm.get('name')!.value,
        this.signupForm.get('email')!.value,
        this.signupForm.get('password')!.value,
        []
      );
      this.fakeBackendService.signup(newUser).subscribe((res) => {
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
        this.takenUserError = true;
      });
    } else {
      console.log('form invalido');
    }

  }

  // metodo para checar se a senha atende os requisitos para registro
  passwordHasError() {
    const passwordControl = this.signupForm.get('password');
    if (
      passwordControl!.hasError('minlength') ||
      passwordControl!.hasError('hasNumber') ||
      passwordControl!.hasError('hasSpecialCharacter') ||
      passwordControl!.hasError('hasLetter')
    ) {
      return true;
    } else {
      return false;
    }
  }

}
