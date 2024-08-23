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
    this.loading = true;

    try {
      // TODO

      this.router.navigateByUrl('/main');
      this.loading = false;
    } catch (e){
      this.loading = false;
      if (e instanceof Error) this.snackBar.open(e.message, '', { duration: 3000 });
    }
  }

}
