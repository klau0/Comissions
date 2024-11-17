import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Web3storageService } from '../../shared/services/web3storage.service';
import { Web3jsService } from '../../shared/services/web3js.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  profile_url = '';
  profile: File = new File([], '');
  portfolio_urls: string[] = [];
  portfolio_files: File[] = [];
  loading: boolean = false;

  signUpUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    pswd: new FormControl('', Validators.required),
    rePswd: new FormControl('', Validators.required)
  });

  signUpArtistForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    pswd: new FormControl('', Validators.required),
    rePswd: new FormControl('', Validators.required),
    about: new FormControl('', Validators.required)
  });

  activeForm: FormGroup = this.signUpUserForm;

  constructor(
    private location: Location,
    private snackBar: MatSnackBar, 
    private router: Router,
    private web3storageService: Web3storageService,
    private web3jsService: Web3jsService
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.profile = file;
    this.profile_url = URL.createObjectURL(file);
    event.target.value = null;
  }

  onFilesSelected(event: any) {
    for (let file of event.target.files) {
      this.portfolio_files.push(file);
      this.portfolio_urls.push(URL.createObjectURL(file));
    }
    event.target.value = null;
  }

  resetFileVariables() {
    this.portfolio_urls = [];
    this.portfolio_files = [];

    this.profile = new File([], '');
    this.profile_url = '';
  }

  async onSubmit($event: Event) {
    //  <img src="https://CID.ipfs.w3s.link/FÁJLNÉV.KIT"> ha dir
    //  ez is jó: `${fileCid}`, vagy ez: '' + fileCid;
    //  console.log(`https://${fileCid}.ipfs.w3s.link/?filename=${valami}`);
    const name = this.activeForm.controls.name;
    const pswd = this.activeForm.controls.pswd;
    const rePswd = this.activeForm.controls.rePswd;
    const email = this.activeForm.controls.email;
    const about = this.activeForm.controls.about;
    const isInputValid = await this.isInputValid(name, pswd, rePswd, email, about);

    if (isInputValid) {
      this.loading = true;
      let serializedProfile = '';

      const serializedPortfolioFiles = await this.web3storageService.uploadFiles(this.portfolio_files);
      if (this.profile.name) {
        serializedProfile = await this.web3storageService.uploadFile(this.profile);
      }

      // about only exists in the signUpArtistForm -> an artist wants to sign up
      if (about) {
        await this.web3jsService.addArtist(name.value, email.value, pswd.value, about.value, serializedProfile, serializedPortfolioFiles);
      } else {
        await this.web3jsService.addUser(name.value, email.value, pswd.value, serializedProfile);
      }

      this.snackBar.open('Sikeres regisztráció!', '', { duration: 3000 });
      await this.router.navigateByUrl("/login");
      this.loading = false;
    }

    this.resetFileVariables();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    if (tabChangeEvent.tab.textLabel === "Művészeknek") {
      this.activeForm = this.signUpArtistForm;
    } else {
      this.activeForm = this.signUpUserForm;
    }
    this.resetFileVariables();
    this.activeForm.reset();
  }

  async isInputValid(
    name: AbstractControl<any, any>,
    pswd: AbstractControl<any, any>,
    rePswd: AbstractControl<any, any>,
    email: AbstractControl<any, any>,
    about: AbstractControl<any, any>
  ): Promise<boolean> {
    if (name.invalid || pswd.invalid || rePswd.invalid || email.value === '' || (about && about.invalid)) {
      this.snackBar.open('A kötelező mezőket ki kell tölteni!', '', { duration: 3000 });
      return false;
    }

    if (email.invalid) {
      this.snackBar.open('Helytelen e-mail cím!', '', { duration: 3000 });
      return false;
    }

    const isEmailTaken = await this.web3jsService.isEmailTaken(email.value);
    if (isEmailTaken) {
      this.snackBar.open('Az e-mail cím már foglalt!', '', { duration: 3000 });
      return false;
    }

    if (pswd.value.trim() !== rePswd.value.trim()) {
      this.snackBar.open('A két jelszó nem egyezik!', '', { duration: 3000 });
      return false;
    }

    return true;
  }

  goBack() {
    this.location.back();
  }
}
