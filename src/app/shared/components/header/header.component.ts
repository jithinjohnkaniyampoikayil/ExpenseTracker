import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() togglesideBarFlag: EventEmitter<any> = new EventEmitter();
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}
  toggleSidebar() {
    this.togglesideBarFlag.emit();
  }
  signOut() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
