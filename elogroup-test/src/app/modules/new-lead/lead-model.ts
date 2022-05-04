export interface OpportunityInterface {
  name: string;
}

export const enum LeadStatus {
  clienteEmPotencial = 'CP',
  dadosConfirmados = 'DC',
  reuniaoAgendada = 'RA'
}

export class LeadModel {
  name: string;
  phone: string;
  email: string;
  opportunities: OpportunityInterface [];
  status: string;
  constructor(
    name: string,
    phone: string,
    email: string,
    opportunities: OpportunityInterface[],
    status: string
  ) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.opportunities = opportunities;
    this.status = status;
  }
}
