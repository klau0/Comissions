import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  artistId = '3';

  constructor() {}

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

  }
}
