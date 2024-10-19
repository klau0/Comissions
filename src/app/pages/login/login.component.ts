import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,  Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  loading: boolean = false;

  constructor(private router: Router, private snackBar: MatSnackBar){}

  async login() {
    if (this.isInputValid()) {
      this.loading = true;
      // TODO: get user id from backend etc.
      const userId = self.crypto.randomUUID();
      // Put user id in session
      sessionStorage.setItem("uid", userId);
      this.loading = false;
      this.router.navigateByUrl('/main');
    }
  }

  isInputValid(): boolean {
    if (this.password.invalid || this.email.value === '') {
      this.snackBar.open('Adja meg a belépési adatokat!', '', { duration: 3000 });
      return false;
    } else if (this.email.invalid) {
      this.snackBar.open('Helytelen e-mail cím!', '', { duration: 3000 });
      return false;
    }

    return true;
  }

}
