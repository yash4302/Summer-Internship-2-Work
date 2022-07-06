import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '@msi/cobalt/header';
import { LoginAuthService } from 'src/app/_services/login-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @HostBinding('style.width') readonly width: string = '100%';

  header_name = 'Review CRUD';
  sessionManager_enable = true;
  time_enable = true;
  responsive_enable = true;

  private _demoTimeout!: ReturnType<typeof setTimeout>;

  checkOverflow(header: HeaderComponent) {
    this._demoTimeout = setTimeout(() => header.checkOverflow(), 0);
  }

  ngOnDestroy() {
    if (this._demoTimeout) {
      clearTimeout(this._demoTimeout);
    }
  }

  constructor(private router: Router, private authService: LoginAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.deAuthenticate();
    this.router.navigateByUrl('/login');
  }
}
