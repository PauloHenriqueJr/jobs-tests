import { UserModel } from './../user/user-model';
import { CurrentUserModel } from './../user/current-user-model';
import { LeadModel, LeadStatus } from './../new-lead/lead-model';
import { Component, OnInit } from '@angular/core';
import { StorageKeys, StorageService } from 'src/app/core/services/storage.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FakeBackendService } from 'src/app/core/services/fake-backend.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})

export class LeadsComponent implements OnInit {
  savedLeads: LeadModel[];
  clienteEmPotencial: LeadModel[];
  dadosConfirmados: LeadModel[];
  reuniaoAgendada: LeadModel[];

  constructor(
    private storageService: StorageService,
    private fakeBackendService: FakeBackendService
  ) {
    this.clienteEmPotencial = [];
    this.dadosConfirmados = [];
    this.reuniaoAgendada = [];
  }

  ngOnInit(): void {
    this.getLeads();
  }

  // metodo que pega todos os leads do usuario que está logado no momento
  getLeads() {
    this.fakeBackendService.getLeads().subscribe((leads: LeadModel[]) => {
      this.savedLeads = leads;
      this.sortLeads();
    },
    (error) => {
      console.log(error);
    });
  }

  // metodo que ordena os Leads pelos status em 3 arrays diferentes,
  // clienteEmPotencial, dadosConfirmados e reuniaoAgendada.
  sortLeads() {
    for (let lead of this.savedLeads) {
      if (lead.status === LeadStatus.clienteEmPotencial) {
        this.clienteEmPotencial = [...this.clienteEmPotencial, lead];
      } else if (lead.status === LeadStatus.dadosConfirmados) {
        this.dadosConfirmados = [...this.dadosConfirmados, lead];
      } else if (lead.status === LeadStatus.reuniaoAgendada) {
        this.reuniaoAgendada = [...this.reuniaoAgendada, lead];
      }
    }
  }
  
  // metodo que limpa o usuario logado do storage
  clear() {
    this.storageService.clear();
  }

  // esse metodo é chamado quando o usuario arrasta o card do lead para outro status, e atualiza o status do lead. 
  // O metodo também atualiza o array de leads do usuario logado, quando você logar novamente ele vai ter os leads atualizados.
  dropLead(event: CdkDragDrop<LeadModel[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      // os Leads só podem ser movidos para posições subsequentes, ou seja, saindo da posição inicial que é o cliente em potencial para o status de dadosConfirmados ou reuniaoAgendada.
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // condincional para atualizar o status do lead e posteriormente sendo usado no metodo sortLeads
      if (event.container.id === LeadStatus.dadosConfirmados) {
        this.dadosConfirmados[event.currentIndex].status = LeadStatus.dadosConfirmados;
      } else if (event.container.id === LeadStatus.reuniaoAgendada) {
        this.reuniaoAgendada[event.currentIndex].status = LeadStatus.reuniaoAgendada;
      }
    }

    // atualizando o array de leads do usuario logado
    let newSavedLeads: LeadModel[] = [];
    newSavedLeads = [...this.clienteEmPotencial, ...this.dadosConfirmados, ...this.reuniaoAgendada];
    this.fakeBackendService.updateLeads(newSavedLeads).subscribe((res) => {
      console.log('leads atualizadas');
    },
    (error) => {
      console.log(error);
    });
  }

}
