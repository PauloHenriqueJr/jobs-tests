import { CurrentUserModel } from './../../modules/user/current-user-model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { UserModel } from 'src/app/modules/user/user-model';
import { LeadModel } from 'src/app/modules/new-lead/lead-model';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let savedUsers: UserModel[] = this.storageService.getUsers();

    // toda vez que for criar um novo usuario, sera checado no storage se ja existe um usuario com o mesmo email, se existir, nao sera criado.
    if (request.url.endsWith('/users/register') && request.method === 'POST') {

      let newUser: UserModel = request.body as UserModel;

      let duplicateUser = savedUsers.filter((user) => {
        return user.email === newUser.email;
      }).length;
      if (duplicateUser) {
          return throwError(() => new Error('Este usuário já existe.'));
      }

      savedUsers.push(newUser);
      this.storageService.replaceUsers(savedUsers);

      return of(new HttpResponse({ status: 200 }));
    }

    // toda vez que for fazer login com determinado usuario, sera checado no storage se existe um usuario registrado com o email e senha informados, se existir, sera retornado o usuario logado.
    if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
      let loginUser: UserModel = request.body as UserModel;
      let filteredUsers = savedUsers.filter(user => {
          return user.email === loginUser.email && user.password === loginUser.password;
      });
      if (filteredUsers.length) {
          let currentUser: CurrentUserModel = new CurrentUserModel(
            filteredUsers[0].email,
            'fake-jwt-token'
          );

          return of(new HttpResponse({ status: 200, body: currentUser }));
      } else {
          return throwError(() => new Error('Email ou senha incorretos.'));
      }
    }

    // toda vez que for fazer um novo lead, sera checado no storage se ja existe um lead com o mesmo nome, se existir, nao sera criado.
    if (request.url.endsWith('user/new-lead') && request.method === 'POST') {
      if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        let currentUser: CurrentUserModel = this.storageService.getCurrentUser();
        let newLead: LeadModel = request.body as LeadModel;
        for (let user of savedUsers) {
          if (user.email === currentUser.email) {
            user.leads.push(newLead);
            this.storageService.replaceUsers(savedUsers);
            return of(new HttpResponse({ status: 200 }));
          }
        }
      } else {
        return throwError(() => new Error('Não autorizado'));
      }
    }

    // toda vez que for buscar um Lead de determinado usuario, sera checado no storage se existe um Lead com mesmo token informado, se existir, sera retornado o Lead.
    if (request.url.endsWith('user/leads') && request.method === 'GET') {
      if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        let currentUser: CurrentUserModel = this.storageService.getCurrentUser();
        let filteredUsers = savedUsers.filter(user => {
          return user.email === currentUser.email;
        });
        if (filteredUsers.length) {
          let leads: LeadModel[] = filteredUsers[0].leads;
          return of(new HttpResponse({ status: 200, body: leads }));
        }
      } else {
        return throwError(() => new Error('Não autorizado'));
      }
    }

    // toda vez que for atualizar um Lead de determinado usuario, sera checado no storage se existe um Lead com mesmo token informado, se existir, sera atualizado o Lead.
    if (request.url.endsWith('user/leads/update') && request.method === 'POST') {
      if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
        let currentUser: CurrentUserModel = this.storageService.getCurrentUser();
        let leads: LeadModel[] = request.body as LeadModel[];
        for (let user of savedUsers) {
          if (user.email === currentUser.email) {
            user.leads = leads;
            this.storageService.replaceUsers(savedUsers);
            return of(new HttpResponse({ status: 200 }));
          }
        }

      } else {

        return throwError(() => new Error('Não autorizado'));
      }
    }


    return next.handle(request);
  }
}
