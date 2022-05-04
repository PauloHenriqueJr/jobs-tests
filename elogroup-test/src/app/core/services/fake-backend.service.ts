import { LeadModel } from './../../modules/new-lead/lead-model';
import { CurrentUserModel } from './../../modules/user/current-user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/modules/user/user-model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  // rota para registrar um novo usuario
  signup(user: UserModel) {
    return this.http.post('/users/register', user);
  }

  // rota de autenticacao de usuario
  login(email: string, password: string) {
    return this.http.post('/users/authenticate', {email: email, password: password}).pipe(
      map(user => {
        if (user) {
          this.storageService.saveCurrentUser(user as CurrentUserModel);
        }
        return user;
      })
    );
  }

  // saindo e removendo o usuario do storage
  logout() {
    this.storageService.deleteCurrentUser();
  }

  // rota para pegar todos os leads do usuario logado
  getLeads() {
    return this.http.get('user/leads');
  }
  // rota para cadastrar um novo lead
  newLead(lead: LeadModel) {
    return this.http.post('user/new-lead', lead);
  }
  // rota para editar um lead
  updateLeads(leads: LeadModel[]) {
    return this.http.post('user/leads/update', leads);
  }
}
