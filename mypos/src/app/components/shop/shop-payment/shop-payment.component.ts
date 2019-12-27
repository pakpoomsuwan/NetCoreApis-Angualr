import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-shop-payment',
  templateUrl: './shop-payment.component.html',
  styleUrls: ['./shop-payment.component.css']
})
export class ShopPaymentComponent implements OnInit {

  orderPayment: string;
  @Input("total") totalPayment: number;
  @Input() name: string;

  @Output() submit = new EventEmitter<void>();
  @Output() nickname = new EventEmitter<string>();

  givenNumber = '0.00';

  constructor(private networkService: NetworkService) { }

  ngOnInit(): void {
    console.log(this.name);
  }

  public get mChange(): number {
    const cash = Number(this.givenNumber.replace(/,/g, ''));
    const result = cash - this.totalPayment;
    if (result >= 0) {
      return result;
    } else {
      return 0;
    }
  }

  public get isPaidEnough() {
    var given = Number(this.givenNumber);
    if (given > 0 && given >= this.totalPayment) {
      return true;
    }
    return false;
  }

  onClickExact() {
    this.givenNumber = String(this.totalPayment);
  }

  onClickGiven(addGiven: number) {
    this.givenNumber = String(Number(this.givenNumber) + addGiven + '.00');
  }

  onClickReset() {
    this.givenNumber = '0.00';
  }

  onClickSubmit() {
    this.submit.emit();
    this.nickname.emit('pakpoom.s');
  }

}
