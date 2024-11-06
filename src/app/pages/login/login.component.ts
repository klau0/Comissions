import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,  Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3jsService } from '../../shared/services/web3js.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  loading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private web3jsService: Web3jsService
  ){}

  login() {
    // this.web3jsService.getArtistsLenght();
    if (this.isInputValid()) {
      this.loading = true;
      this.web3jsService.login(this.email.value!, this.password.value!).then((result) => {
        if (Number(result[0]) === -1) {
          this.snackBar.open('Rossz e-mail vagy jelszó!', '', { duration: 3000 });
          this.loading = false;
        } else {
          const id = (Number(result[0])).toString();
          sessionStorage.setItem("uid", id);
          sessionStorage.setItem("isArtist", result[1].toString());

          console.log('id: ' + id, 'isArtist: ' + result[1].toString());

          this.loading = false;
          this.router.navigateByUrl('/main');
        }
      });
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
