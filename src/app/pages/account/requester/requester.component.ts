import { Component } from '@angular/core';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrl: './requester.component.scss'
})
export class RequesterComponent {
  isCommissionDone = false;
  requestedImages: File[] = [];

  onFilesSelected(event: any) {
    for (let file of event.target.files) {
      this.requestedImages.push(file);
    }
  }

  sendImagesToRequester() {
    // todo: - küldés megvalósítása
    //       - requests mappingből törölni az adott requestet ?? (kell a megrendelések lekéréséhez is)
  }

  markCommissionAsDone() {
    this.isCommissionDone = true;
  }

  markCommissionAsNotDone() {
    this.isCommissionDone = false;
    this.requestedImages = [];
  }
}
