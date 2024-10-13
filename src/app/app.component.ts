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
  loggedInUser = true;
  lastSelectedMenu: HTMLElement | null = null;

  constructor(private router: Router) {}

  // TODO: logout service? change loggedInUser to false;

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
  }

  onMenuSelected($event: Event){
    const target = $event.target as HTMLElement;

    if (this.lastSelectedMenu !== target){
      target.classList.add('active');
      this.lastSelectedMenu?.classList.remove('active');
      this.lastSelectedMenu = target;
    }
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }
}
