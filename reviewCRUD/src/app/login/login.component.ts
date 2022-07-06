import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from '../_services/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('style.width') readonly forcedWidth = '100%';

  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: LoginAuthService) {
    if (this.authService.getAuthStatus() == 'true'){
      this.router.navigateByUrl('');
    }
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [ // ng-password-validator
        // https://stackoverflow.com/questions/48350506/how-to-validate-password-strength-with-angular-5-validator-pattern
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.isSubmitted = true;
    this.loginForm.updateValueAndValidity();

    if(this.loginForm.invalid) {
      return;
    }
    else {
      // Try to login
      this.authService.authenticateUser(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value);
      if(!this.authService.isAuthenticated) {
        this.loginForm.controls['userName'].setErrors({'incorrect': true});
        this.loginForm.controls['password'].setErrors({'incorrect': true});
        this.loginForm.reset();
      }
      else {
        this.router.navigateByUrl('/students/dashboard');
      }
    }
  }
}
