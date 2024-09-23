import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Web3storageService } from '../../shared/services/web3storage.service';
import { Web3 } from "web3";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  profile_url = '';
  profile: File = new File([], '');
  renamed_profile: File = new File([], '');
  portfolio_urls: string[] = [];
  portfolio_files: File[] = [];
  renamed_portfolio_files: File[] = [];
  serializedFiles: string[] = [];

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
    // Save user id in session at first visit
    if (sessionStorage.getItem("uid") === null) {
      const userId = self.crypto.randomUUID();
      sessionStorage.setItem("uid", userId);
    }
    this.web3storageService.delegateAccessToClientOnStorageSpace();

    const web3 = new Web3("http://127.0.0.1:8545/");

    web3.eth
    .getChainId()
    .then((result) => {
      console.log("Chain ID: " + result);
    })
    .catch((error) => {
      console.error(error);
    });

  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.profile = file;
    this.profile_url = URL.createObjectURL(file);
  }

  onFilesSelected(event: any) {
    for (let file of event.target.files){
      this.portfolio_files.push(file);
      this.portfolio_urls.push(URL.createObjectURL(file));
    }
  }

  renameFiles() {
    // portfolio
    for (const file of this.portfolio_files) {
      const newName = sessionStorage.getItem("uid") + '_' + file.name;
      this.renamed_portfolio_files.push(new File([file], newName, {type: file.type}));
    }
    // profile
    const newName = sessionStorage.getItem("uid") + '_' + this.profile.name;
    this.renamed_profile = new File([this.profile], newName, {type: this.profile.type});
  }

  resetFileVariables() {
    this.portfolio_urls = [];
    this.portfolio_files = [];
    this.renamed_portfolio_files = [];

    this.profile = new File([], '');
    this.renamed_profile = new File([], '');
    this.profile_url = '';
  }

  async onSubmit($event: Event) {
    //  <img src="https://CID.ipfs.w3s.link/FÁJLNÉV.KIT"> ha dir
    //  ez is jó: `${fileCid}`, vagy ez: '' + fileCid;
    //  console.log(`https://${fileCid}.ipfs.w3s.link/?filename=${valami}`);
    this.serializedFiles = [];
    // TODO
    if (this.isInputValid()) {
      
    }
    this.renameFiles();
    //console.log(this.portfolio_files);
    //console.log(this.renamed_portfolio_files);
    //console.log(this.profile);
    //console.log(this.renamed_profile);
    for (const file of this.renamed_portfolio_files) {
      const fileCid = await this.web3storageService.uploadFile(file);
      const serializedCid = this.web3storageService.serializeCID(fileCid);
      this.serializedFiles.push(serializedCid);
    }
    if (this.renamed_profile.name) {
      const fileCid = await this.web3storageService.uploadFile(this.renamed_profile);
      const serializedCid = this.web3storageService.serializeCID(fileCid);
      this.serializedFiles.push(serializedCid);
    }
    this.resetFileVariables();
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    if (tabChangeEvent.tab.textLabel === "Művészeknek") {
      this.activeForm = this.signUpArtistForm;
    } else {
      this.activeForm = this.signUpUserForm;
    }
  }

  isInputValid(): boolean {
    if (this.activeForm.get('pswd')?.value!.trim() !== this.activeForm.get('rePswd')?.value!.trim()) {
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
    // Delete files from web3storage
    for (const file of this.serializedFiles) {
      const parsedCid = this.web3storageService.parseCID(file);
      this.web3storageService.removeCID(parsedCid);
    }
    //this.location.back();
  }
}
