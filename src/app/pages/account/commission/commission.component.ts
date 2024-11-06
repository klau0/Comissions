import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-commission',
  templateUrl: './commission.component.html',
  styleUrl: './commission.component.scss'
})
export class CommissionComponent implements OnInit {
  @Input() titleAndPrice = "";
  @Input() requestsData: any[] = [];
  title = '';
  price = 0;
  requestsNumber = 0;
  totalIncome = 0;
  @Output() allRequestsDone: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    const titleAndPriceSplit = this.titleAndPrice.split(' ');
    this.title = titleAndPriceSplit[0];
    this.price = Number(titleAndPriceSplit[1]);
    this.requestsNumber = this.requestsData.length;
    this.totalIncome = this.price * this.requestsNumber;
  }

  markAsDone(event: number) {
    console.log(event);
    for (let i = 0; i < this.requestsNumber; i++) {
      if (this.requestsData[i]['requestId'] === event) {
        console.log(this.requestsData.splice(i, 1));
        if (this.requestsData.length === 0) {
          console.log(this.titleAndPrice, ": no longer has requests on it");
          this.allRequestsDone.emit(this.titleAndPrice);
        } else {
          this.requestsNumber--;
          this.totalIncome -= this.price;
        }
      }
    }
  }
}
