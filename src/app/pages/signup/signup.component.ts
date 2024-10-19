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
  portfolio_urls: string[] = [];
  portfolio_files: File[] = [];
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
    about: new FormControl('', Validators.required)
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

    /*const web3 = new Web3("http://127.0.0.1:8545/");

    web3.eth
    .getChainId()
    .then((result) => {
      console.log("Chain ID: " + result);
    })
    .catch((error) => {
      console.error(error);
    });

    const json = require('../../../../hardhat/artifacts/contracts/TestContract.sol/TestContract.json');
    const myContract = new web3.eth.Contract(json.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    myContract.methods.message().call().then((msg) => {
      console.log(msg);
    });*/
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
    this.serializedFiles = [];
    // TODO
    //   - default profilkép beállítása ha nincs megadva
    if (this.isInputValid()) {
      // TODO: put on blockchain
      const userId = self.crypto.randomUUID();

    }
    //console.log(this.portfolio_files);
    //console.log(this.profile);
    for (const file of this.portfolio_files) {
      const fileCid = await this.web3storageService.uploadFile(file);
      const serializedCid = this.web3storageService.serializeCID(fileCid);
      this.serializedFiles.push(serializedCid);
    }
    if (this.profile.name) {
      const fileCid = await this.web3storageService.uploadFile(this.profile);
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
    const name = this.activeForm.get('name');
    const pswd = this.activeForm.get('pswd');
    const rePswd = this.activeForm.get('rePswd');
    const email = this.activeForm.get('email');
    const about = this.activeForm.get('about');

    if (name?.invalid || pswd?.invalid || rePswd?.invalid || email?.value === '' || (about && about.invalid)) {
      this.snackBar.open('A kötelező mezőket ki kell tölteni!', '', { duration: 3000 });
      return false;
    }

    if (email?.invalid) {
      this.snackBar.open('Helytelen e-mail cím!', '', { duration: 3000 });
      return false;
    }

    if (pswd?.value!.trim() !== rePswd?.value!.trim()) {
      this.snackBar.open('A két jelszó nem egyezik!', '', { duration: 3000 });
      return false;
    }

    // TODO: DAO - user with this email exists

    return true;
  }

  goBack() {
    // For testing:
    // Delete files from web3storage
    for (const file of this.serializedFiles) {
      const parsedCid = this.web3storageService.parseCID(file);
      this.web3storageService.removeCID(parsedCid);
    }
    //this.location.back();
  }
}
