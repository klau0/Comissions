import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  color: ThemePalette = 'warn';

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pswd: new FormControl('', Validators.required),
    rePswd: new FormControl('', Validators.required)
  });

  constructor(
    private location: Location,
    private snackBar: MatSnackBar, 
    private router: Router){}

  onSubmit() {
    // TODO
  }

  valid_pswd_confirm(): boolean{
    if (this.signUpForm.get('pswd')?.value!.trim() !== this.signUpForm.get('rePswd')?.value!.trim()){
      this.snackBar.open('A két jelszó nem egyezik!', '', { duration: 3000 });
      return false;
    } return true;
  }

  goBack() {
    this.location.back();
  }
}
