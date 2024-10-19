import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  isArtist: boolean = true;
  editModeOnAbout = false;
  isNewPackage = false;
  about = new FormControl('', Validators.required);
  // TODO: kivenni majd
  pName = "Családi kép háziállattal";
  pPrice = 5000;
  pDesc ='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at consectetur odio. Ut tortor ante, pellentesque non convallis ut, vulputate nec metus. Aliquam erat volutpat. Praesent lobortis ligula sit amet ultricies pretium. Integer ac turpis pulvinar, volutpat tellus ornare, lobortis ipsum. Phasellus tincidunt enim id ante euismod pretium. Fusce tincidunt iaculis ultricies. Etiam sollicitudin, massa at viverra posuere, mi mauris cursus nibh, vitae molestie tortor erat in urna.'

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    
  }

  showDeleteOption($event: Event) {
    const target = <HTMLElement>((<HTMLElement>$event.target).nextElementSibling);
    if (target) {
      target.style.display = 'block';
    }
  }

  hideDeleteOption($event: Event) {
    const target = <HTMLElement>$event.target;
    if (target.className === 'shadow') {
      target.style.display = 'none';
    }
  }

  editAboutInfo() {
    this.about.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at consectetur odio. Ut tortor ante, pellentesque non convallis ut, vulputate nec metus. Aliquam erat volutpat. Praesent lobortis ligula sit amet ultricies pretium. Integer ac turpis pulvinar, volutpat tellus ornare, lobortis ipsum. Phasellus tincidunt enim id ante euismod pretium. Fusce tincidunt iaculis ultricies. Etiam sollicitudin, massa at viverra posuere, mi mauris cursus nibh, vitae molestie tortor erat in urna.');
    this.editModeOnAbout = true;
  }

  goBack() {
    this.editModeOnAbout = false;
  }

  updateAboutInfo() {
    if (this.about.valid) {
      // TODO
      this.editModeOnAbout = false;
    } else {
      this.snackBar.open('Adja meg az új leírást!', '', { duration: 3000 });
    }
  }

  deletePortfolioImg($event: Event) {
    const img = (<HTMLElement>$event.target).closest('.shadow')?.previousElementSibling;
  }

  addToPortfolio(event: any) {
    for (let file of event.target.files){
      // TODO
    }
  }

  showNewPackage() {
    this.isNewPackage = true;
  }

  hideNewPackage(event: any) {
    if (this.isNewPackage && event === true) {
      this.isNewPackage = false;
    }
  }

}
