import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Input() loggedInUser = false;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();

  close(logout?: boolean) {
    this.onCloseSidenav.emit(true);
    /*if (logout === true) {
      this.onLogout.emit(logout);
    }*/
  }

  selected(s: string): boolean {
    if (this.currentPage.includes(s)){
      return true;
    } return false;
  }

}
