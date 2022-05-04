import {
  AfterContentInit, AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {IUser} from "../../interfaces/IUser";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {Moment} from "moment";
@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() users: IUser[] = [];
  @Output() userRemoved: EventEmitter<Moment> = new EventEmitter<Moment>();

  // display com as colunas da tabela

  displayedColumns: string[] = ['nome', 'telefone', 'actions'];

  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  filter: string = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  //metodo que sera chamado quando o input for alterado
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource.data = this.users;
  }
  //metodo que irá ordenar o usuario da tabela
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  //metodo que irá remover o usuario da tabela
  onDelete(element: IUser) {
    this.userRemoved.emit(element.index);
  }
  //metodo de busca de usuario na tabela
  onFilterUsers($event: any) {
    this.dataSource.filter = $event.target.value;
  }

}
