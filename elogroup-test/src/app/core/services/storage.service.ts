import { CurrentUserModel } from './../../modules/user/current-user-model';
import { Injectable } from '@angular/core';
import { LeadModel } from 'src/app/modules/new-lead/lead-model';
import { UserModel } from 'src/app/modules/user/user-model';

export const enum StorageKeys {
  leads = 'leads',
  users = 'users',
  currentUser = 'currentUser'
}
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorage: Storage;
  constructor(

  ) {
    this.localStorage = window.localStorage;
  }

  //salvando o lead no storage
  saveOneLead(lead: LeadModel) {
    let savedLeads: LeadModel[] = this.getLeads();
    savedLeads.push(lead);
    this.localStorage.setItem(StorageKeys.leads, JSON.stringify(savedLeads));
  }

  //buscando apenas um lead no storage
  getLeads(): LeadModel[] {
    return JSON.parse(this.localStorage.getItem(StorageKeys.leads)!) || [];
  }

  //substituindo o lead antigo no storage pelo novo
  replaceLeads(leads: LeadModel[]) {
    this.localStorage.setItem(StorageKeys.leads, JSON.stringify(leads));
  }

  //salvando novo usuario no storage de acordo com modelo
  saveOneUser(user: UserModel) {
    let savedUsers: UserModel[] = this.getUsers();
    savedUsers.push(user);
    this.localStorage.setItem(StorageKeys.users, JSON.stringify(savedUsers));
  }

  //buscando usuarios salvos no array de usuarios do storage
  getUsers(): UserModel[] {
    return JSON.parse(this.localStorage.getItem(StorageKeys.users)!) || [];
  }

  //substituindo o usuario antigo no storage pelo novo
  replaceUsers(users: UserModel[]) {
    this.localStorage.setItem(StorageKeys.users, JSON.stringify(users));
  }

  //buscando o usuario logado no storage
  getCurrentUser(): CurrentUserModel {
    return JSON.parse(this.localStorage.getItem(StorageKeys.currentUser)!);
  }

  //salvando o usuario logado no storage
  saveCurrentUser(user: CurrentUserModel) {
    this.localStorage.setItem(StorageKeys.currentUser, JSON.stringify(user));
  }

  //removendo o usuario logado do storage através do logout
  deleteCurrentUser() {
    this.localStorage.removeItem(StorageKeys.currentUser);
  }
  
  //limpando o storage para armazenar novos dados
  clear() {
    this.localStorage.clear();
  }

}
