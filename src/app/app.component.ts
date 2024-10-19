import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'comissions-project';
  page = '';
  routes: Array<string> = [];
  loggedInUser = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;

        if (sessionStorage.getItem('uid')) {
          this.loggedInUser = true;
        }
      }
    });
  }

  onClose(event: boolean, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onLogout(event: boolean) {
    if (event === true) {
      this.loggedInUser = false;
      sessionStorage.removeItem("uid");
    }
  }
}
