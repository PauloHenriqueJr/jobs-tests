import { LeadModel } from '../new-lead/lead-model';

export class UserModel {
  name: string;
  email: string;
  password: string;
  leads: LeadModel[];
  constructor(
    name: string,
    email: string,
    password: string,
    leads: LeadModel[]
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.leads = leads;
  }
}
