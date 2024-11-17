import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() currentPage: string = '';
  @Input() loggedInUser: boolean = false;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() logout: EventEmitter<boolean> = new EventEmitter();

  close(logout?: boolean) {
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.logout.emit(true);
    }
  }

  selected(s: string): boolean {
    if (this.currentPage === s) {
      return true;
    } return false;
  }

}
