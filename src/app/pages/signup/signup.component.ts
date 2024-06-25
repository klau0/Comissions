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
  profile_pic_name = '';
  profile_pic_url = '';
  file_urls: string[] = [];

  signUpUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pswd: new FormControl('', Validators.required),
    rePswd: new FormControl('', Validators.required)
  });

  signUpArtistForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    pswd: new FormControl('', Validators.required),
    rePswd: new FormControl('', Validators.required),
    about: new FormControl('')
  });

  constructor(
    private location: Location,
    private snackBar: MatSnackBar, 
    private router: Router){}

    onFileSelected(event: any) {
      const file: File = event.target.files[0];

      this.profile_pic_name = file.name;
      this.profile_pic_url = URL.createObjectURL(file);
    }

    onFilesSelected(event: any) {
      for (let file of event.target.files){
        this.file_urls.push(URL.createObjectURL(file));
      }
    }

  onSubmit() {
    // TODO
  }

  // TODO: mind2 formra
  valid_pswd_confirm(): boolean{
    if (this.signUpUserForm.get('pswd')?.value!.trim() !== this.signUpUserForm.get('rePswd')?.value!.trim()){
      this.snackBar.open('A két jelszó nem egyezik!', '', { duration: 3000 });
      return false;
    } return true;
  }

  goBack() {
    this.location.back();
  }
}
