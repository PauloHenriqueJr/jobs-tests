import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FakeBackendService } from 'src/app/core/services/fake-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(
    private fakeBackendService: FakeBackendService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.fakeBackendService.logout();
    this.router.navigateByUrl('/login');
  }

}
