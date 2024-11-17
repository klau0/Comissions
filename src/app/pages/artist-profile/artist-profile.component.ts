import { Component, Input, OnInit, numberAttribute  } from '@angular/core';
import { Web3jsService } from '../../shared/services/web3js.service';
import { Web3storageService } from '../../shared/services/web3storage.service';

@Component({
  selector: 'app-artist-profile',
  templateUrl: './artist-profile.component.html',
  styleUrl: './artist-profile.component.scss'
})
export class ArtistProfileComponent implements OnInit {
  @Input({transform: numberAttribute}) artistId = 0;
  name = '';
  about = '';
  profileUrl = '';
  portfolio: string[] = [];
  packageIds: number[] = [];
  
  constructor(
    private web3jsService: Web3jsService,
    private web3storageService: Web3storageService
  ) {}

  ngOnInit(): void {
    this.web3jsService.getArtistAccountInfo(this.artistId).then((result) => {
      this.name = result[0];
      this.about = result[2];
      // If it's the default profile
      if (!result[3].startsWith("{")) {
        this.profileUrl = `https://${result[3]}.ipfs.w3s.link`;
      } else {
        const parsedCid = this.web3storageService.parseCID(result[3]);
        this.profileUrl = `https://${parsedCid}.ipfs.w3s.link`;
      }
    });

    this.web3jsService.getPortfolio(this.artistId).then((result) => {
      for (const image of result) {
        if (image === '') {
          continue;
        }
        const parsedCid = this.web3storageService.parseCID(image);
        this.portfolio.push(`https://${parsedCid}.ipfs.w3s.link`);
      }
    });

    this.web3jsService.getPackagesLenght(this.artistId).then((lenght) => {
      for (let i = 0; i < lenght; i++) {
        this.web3jsService.isPackageDeleted(this.artistId, i).then((isDeleted) => {
          if (!isDeleted) {
            this.packageIds.push(i);
          }
        });
      }
    });
  }

  removePackage(event: number) {
    const index = this.packageIds.indexOf(event);
    this.packageIds.splice(index, 1);
  }
}
