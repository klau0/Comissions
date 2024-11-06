import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3jsService } from '../../shared/services/web3js.service';
import { Web3storageService } from '../../shared/services/web3storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  artists = new Map<number, string[]>();
  portfolios = new Map<number, string[]>();

  constructor(
    private web3jsService: Web3jsService,
    private web3storageService: Web3storageService
  ) {}

  ngOnInit(): void {
    // it's in app.component.html
    let kereses = document.getElementById("keres");
    kereses?.addEventListener('input', function(){
      let input = this as HTMLInputElement;
      
      if (input.value.length <= 25){
        input.size = 25;
      } else if (input.value.length < 60){
        input.size = input.value.length;
      } else {
        input.size = 60;
      }
    });

    this.setArtistCards();
  }

  async setArtistCards() {
    const artistsLenght = await this.web3jsService.getArtistsLenght();
    for (let i = 0; i < artistsLenght; i++) {
      if (Number(sessionStorage.getItem("uid")) === i && Boolean(sessionStorage.getItem("isArtist"))) {
        continue;
      }

      let artistAccountInfo = await this.web3jsService.getArtistAccountInfo(i);
      // If it's the default profile
      if (!String(artistAccountInfo[3]).startsWith("{")) {
        artistAccountInfo[3] = `url('https://${artistAccountInfo[3]}.ipfs.w3s.link')`;
      } else {
        const parsedCid = this.web3storageService.parseCID(String(artistAccountInfo[3]));
        artistAccountInfo[3] = `url('https://${parsedCid}.ipfs.w3s.link')`;
      }
      this.artists.set(i, Object.values(artistAccountInfo));

      const portfolio = await this.web3jsService.getPortfolio(i);
      let portfolioUrls: string[] = [];
      for (const image of portfolio) {
        if (image === '') {
          continue;
        }
        const parsedCid = this.web3storageService.parseCID(image);
        portfolioUrls.push(`https://${parsedCid}.ipfs.w3s.link`);
      }
      this.portfolios.set(i, portfolioUrls);
    }
  }
}
