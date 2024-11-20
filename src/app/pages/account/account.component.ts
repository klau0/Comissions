import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Web3jsService } from '../../shared/services/web3js.service';
import { Web3storageService } from '../../shared/services/web3storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  defaultProfiles = [
    "bafkreibsywjj2duaupotjzjzgt4g57tenvypqqa52yux2xv77mh364vrkm",
    "bafkreidcci7riyhvjpimiz7lgfvbyd6ug5xajoykw5vsub7pqp4gyllmly"
  ];
  isArtist = false;
  userId = 0;
  editModeOnAbout = false;
  isNewPackage = false;
  aboutInput = new FormControl('', Validators.required);
  name = '';
  email = '';
  about = '';
  profileUrl = '';
  serializedProfileCid = '';
  // imageId => [0: url, 1: serializedCid]
  portfolio = new Map<number, string[]>();
  loadingProfile = false;
  loadingPortfolio = false;
  packageIds: number[] = [];
  // "title price" => {requestId, name, description}[]
  requestedPackagesInfo = new Map<string, any[]>();
  ownRequests: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private web3jsService: Web3jsService,
    private web3storageService: Web3storageService
  ) {}

  ngOnInit(): void {
    this.isArtist = sessionStorage.getItem("isArtist") === "1";
    this.userId = Number(sessionStorage.getItem("uid"));
    
    if (this.isArtist) {
      this.web3jsService.getArtistAccountInfo(this.userId).then((result) => {
        this.name = result[0];
        this.email = result[1];
        this.about = result[2];
        this.updateProfile(String(result[3]));
      });

      this.web3jsService.getPortfolio(this.userId).then((result) => {
        for (const key in result) {
          if (result[key] === '') {
            continue;
          }
          const parsedCid = this.web3storageService.parseCID(result[key]);
          this.portfolio.set(Number(key), [`https://${parsedCid}.ipfs.w3s.link`, result[key]]);
        }
      });

      this.web3jsService.getPackagesLenght(this.userId).then((lenght) => {
        for (let i = 0; i < lenght; i++) {
          this.web3jsService.isPackageDeleted(this.userId, i).then((isDeleted) => {
            if (!isDeleted) {
              this.packageIds.push(i);
              this.web3jsService.getPackageRequestedNumber(this.userId, i).then((num) => {
                if (num > 0) {
                  this.web3jsService.getRequestedPackageInfo(this.userId, i, num).then((result) => {
                    for (let j = 0; j < num; j++) {
                      const key = result[3][j].trim() + " " + Number(result[4][j]);
                      const requestInfo = {
                        requestId: Number(result[2][j]),
                        packageId: i,
                        name: result[0][j],
                        description: result[1][j]
                      };

                      if (this.requestedPackagesInfo.has(key)) {
                        let newArr = this.requestedPackagesInfo.get(key)!;
                        newArr.push(requestInfo);
                        this.requestedPackagesInfo.set(key, newArr);
                      } else {
                        this.requestedPackagesInfo.set(key, [requestInfo]);
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    } else {
      this.web3jsService.getUserAccountInfo(this.userId).then((result) => {
        this.name = result[0];
        this.email = result[1];
        this.updateProfile(String(result[2]));
      });
    }

    this.web3jsService.getRequestsLenght(this.userId, this.isArtist).then((length) => {
      for (let i = 0; i < length; i++) {
        this.web3jsService.getRequestInfo(this.userId, i, this.isArtist).then((result) => {
          const requestInfo = {
            id: i,
            artistName: result[0],
            packageTitle: result[1],
            packagePrice: result[2],
            description: result[3],
            isDone: result[4]
          };
          this.ownRequests.push(requestInfo);
        });
      }
    });
  }

  updateProfile(cid: string) {
    // If it's the default profile
    if (!cid.startsWith("{")) {
      this.profileUrl = `https://${cid}.ipfs.w3s.link`;
    } else {
      const parsedCid = this.web3storageService.parseCID(cid);
      this.profileUrl = `https://${parsedCid}.ipfs.w3s.link`;
    }
    this.serializedProfileCid = cid;
  }

  changeProfilePicture(event: any, shadow: HTMLElement) {
    this.loadingProfile = true;
    const newImg = event.target.files[0];

    if (!this.defaultProfiles.includes(this.serializedProfileCid)) {
      this.web3storageService.removeCID(this.serializedProfileCid);
    }

    this.web3storageService.uploadFile(newImg).then((serializedProfile) => {
      this.updateProfile(serializedProfile);
      this.web3jsService.changeProfilePicture(this.userId, serializedProfile, this.isArtist);
      this.loadingProfile = false;
      shadow.style.display = 'none';
    });
  }

  showOption($event: Event) {
    const target = <HTMLElement>((<HTMLElement>$event.target).nextElementSibling);
    if (target) {
      target.style.display = 'block';
    }
  }

  hideOption($event: Event) {
    const target = <HTMLElement>$event.target;
    if (target.className.includes('shadow')) {
      target.style.display = 'none';
    }
  }

  editAboutInfo() {
    this.aboutInput.setValue(this.about);
    this.editModeOnAbout = true;
  }

  goBack() {
    this.editModeOnAbout = false;
  }

  updateAboutInfo() {
    if (this.aboutInput.valid) {
      this.web3jsService.updateAboutDescription(this.userId, this.aboutInput.value!);
      this.about = this.aboutInput.value!;
      this.editModeOnAbout = false;
    } else {
      this.snackBar.open('Adja meg az új leírást!', '', { duration: 3000 });
    }
  }

  deletePortfolioImg(imageId: number) {
    this.web3storageService.removeCID(this.portfolio.get(imageId)![1]);
    this.web3jsService.deletePortfolioImage(this.userId, imageId);
    this.portfolio.delete(imageId);

    if (this.portfolio.size === 0) {
      this.web3jsService.resetPortfolio(this.userId);
    }
  }

  async addToPortfolio(event: any) {
    this.loadingPortfolio = true;
    const serializedImages = await this.web3storageService.uploadFiles(event.target.files);
    for (const image of serializedImages) {
      const parsedCid = this.web3storageService.parseCID(image);
      await this.web3jsService.addToPortfolio(this.userId, image);
      let imageId = await this.web3jsService.getPortfolioLenght(this.userId);
      imageId--;
      this.portfolio.set(imageId, [`https://${parsedCid}.ipfs.w3s.link`, image]);
    }
    this.loadingPortfolio = false;
  }

  showNewPackage() {
    this.isNewPackage = true;
  }

  addNewPackage(event: number) {
    this.packageIds.push(event);
    this.isNewPackage = false;
  }

  hideNewPackage(event: any) {
    if (this.isNewPackage && event === true) {
      this.isNewPackage = false;
    }
  }

  deletePackage(event: number) {
    const index = this.packageIds.indexOf(event);
    this.packageIds.splice(index, 1);

    if (this.packageIds.length === 0) {
      this.web3jsService.resetPackageNumber(this.userId);
    }
  }

  deleteCommission(event: string) {
    this.requestedPackagesInfo.delete(event);
  }
}
