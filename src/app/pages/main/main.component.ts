import { Component, OnInit } from '@angular/core';
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
  noResult = false;
  noArtists = false;

  constructor(
    private web3jsService: Web3jsService,
    private web3storageService: Web3storageService
  ) {}

  ngOnInit(): void {
    const search = document.getElementById("keres");
    search?.addEventListener('keyup', (event) => {
      if (event.key === "Enter") {
        let input = event.target as HTMLInputElement;
        this.setArtistCards(input.value);
      }
    });
    const clearSearch = document.getElementById("clear-search");
    clearSearch?.addEventListener('click', () => {
      (document.getElementById("keres") as HTMLInputElement).value = "";
      this.setArtistCards();
    });

    this.setArtistCards();
  }

  async setArtistCards(search = "") {
    this.artists.clear();
    this.portfolios.clear();
    this.noResult = false;
    this.noArtists = false;

    const artistsLenght = await this.web3jsService.getArtistsLenght();
    for (let i = 0; i < artistsLenght; i++) {
      if (Number(sessionStorage.getItem("uid")) === i && sessionStorage.getItem("isArtist") === "1") {
        continue;
      }

      let artistAccountInfo = await this.web3jsService.getArtistAccountInfo(i);
      const searchWord = search.trim().toLowerCase();
      const name = String(artistAccountInfo[0]).trim().toLowerCase();
      if (searchWord && !name.includes(searchWord)) {
        continue;
      }

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

    if (this.artists.size === 0) {
      if (search) {
        this.noResult = true;
      } else {
        this.noArtists = true;
      }
    }
  }
}
