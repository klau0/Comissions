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
    this.requestsNumber = this.requestsData.length;
    const price = this.titleAndPrice.match(/ \d+$/);
    if (price) {
      this.price = Number(price[0]);
      this.title = this.titleAndPrice.substring(0, this.titleAndPrice.indexOf(price[0]));
      this.totalIncome = this.price * this.requestsNumber;
    }
  }

  markAsDone(event: number) {
    for (let i = 0; i < this.requestsNumber; i++) {
      if (this.requestsData[i]['requestId'] === event) {
        this.requestsData.splice(i, 1);
        if (this.requestsData.length === 0) {
          this.allRequestsDone.emit(this.titleAndPrice);
        } else {
          this.requestsNumber--;
          this.totalIncome -= this.price;
        }
      }
    }
  }
}
