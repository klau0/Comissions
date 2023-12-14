import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'comissions-project';

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
