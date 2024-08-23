import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Web3storageService } from '../../shared/services/web3storage.service';
import { Signer, UnknownLink } from '@web3-storage/w3up-client/principal/ed25519'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  color: ThemePalette = 'warn';
  profile_pic_name = '';
  profile_pic_url = '';
  file_urls: string[] = [];
  portfolio_files: File[] = [];
  renamed_files: File[] = [];

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
    about: new FormControl('')
  });

  activeForm: FormGroup = this.signUpUserForm;

  constructor(
    private location: Location,
    private snackBar: MatSnackBar, 
    private router: Router,
    private web3storageService: Web3storageService
  ) {}

  ngOnInit(): void {
    this.web3storageService.delegateAccessToClientOnStorageSpace();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.profile_pic_name = file.name;
    this.profile_pic_url = URL.createObjectURL(file);
  }

  onFilesSelected(event: any) {
    for (let file of event.target.files){
      this.portfolio_files.push(file);
      this.file_urls.push(URL.createObjectURL(file));
    }
  }

  renamePortfolioFiles(){
    let i = 0;
    for (let file of this.portfolio_files){
      let splitName = file.name.split('.');
      let extension = '.' + splitName[splitName.length-1];
      let newName = "portfolio_" + i + ".png";
      this.renamed_files.push(new File([file], newName, {type: file.type}));
      i++;
    }
  }

  async onSubmit($event: Event) {
    // TODO
    if (this.isInputValid()){
      
    }
    this.renamePortfolioFiles();
    console.log(this.renamed_files);
    console.log(this.portfolio_files);
    // <img src="https://CID.ipfs.w3s.link/FÁJLNÉV.KIT">
    // const directoryCid = await this.web3storageService.uploadDirectory(this.portfolio_files);
    // ez is jó: `${directoryCid}`, vagy ez: '' + directoryCid;
    // console.log(`https://${directoryCid}.ipfs.w3s.link`);
    // let cidString = JSON.stringify(directoryCid);
    // let cidObj = JSON.parse(cidString);
    // szerializáció?
    //this.web3storageService.removeDirectory(directoryCid);
    this.portfolio_files = [];
    this.renamed_files = [];
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    if (tabChangeEvent.tab.textLabel === "Művészeknek"){
      this.activeForm = this.signUpArtistForm;
    } else {
      this.activeForm = this.signUpUserForm;
    }
  }

  isInputValid(): boolean {
    if (this.activeForm.get('pswd')?.value!.trim() !== this.activeForm.get('rePswd')?.value!.trim()){
      this.snackBar.open('A két jelszó nem egyezik!', '', { duration: 3000 });
      return false;
    }

    if (this.activeForm.get('email')?.invalid){
      this.snackBar.open('Helytelen e-mail cím!', '', { duration: 3000 });
      return false;
    }

    // TODO: DAO - user with this email exists

    return true;
  }

  goBack() {
    this.location.back();
  }
}
