import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomFormValidatorService } from '../../services/custom-form-validator.service';
import { FakeBackendService } from '../../services/fake-backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;
  loginError: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private customFormValidatorService: CustomFormValidatorService,
    private fakeBackendService: FakeBackendService,
    private router: Router
  ) {

    //criando o formulario de login com validacao em regex
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        this.customFormValidatorService.patternValidator(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { invalidEmail: true })
      ]),
      password: new FormControl('', Validators.required)
    });
    this.hide = true;
    this.loginError = false;
   }

  ngOnInit(): void {
  }


  //metodo para fazer o login, tendo validado o usuario é redirecionado para a pagina principal de leads
  login() {
    if (this.loginForm.valid) {
      this.fakeBackendService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      ).subscribe((data) => {
        this.router.navigateByUrl('/leads');
      },
      (error) => {
        console.log(error);
        this.loginError = true;
      });
    } else {
      console.log('form invalido');
    }
  }

}
