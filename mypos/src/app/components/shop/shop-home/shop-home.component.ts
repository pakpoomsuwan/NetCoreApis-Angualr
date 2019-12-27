import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {

  mProductArray = new Array<Product>();
  mOrderArray = new Array<Product>();
  mTotalPrice = 0;
  mIsPaymentShow = false;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData();
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        const product = data.result as Product[];
        this.mProductArray = product.map(
          item => {
            item.image = this.networkService.getProductImage(item.image);
            return item;
          }
        );
      },
      error => {
        console.log(error);
      }
    )
  }

  onClickAddOrder(item: Product, isDecrease: Boolean) {
    if (this.mOrderArray.indexOf(item) !== -1) {
      if (isDecrease && item.qty > 0) {
        item.qty--;
      } else {
        if (!isDecrease)
          item.qty++;
      }
    } else {
      item.qty = 1;
      this.mOrderArray.unshift(item);
    }
    this.countSumPrice();
  }

  countSumPrice() {
    this.mTotalPrice = 0;
    this.mOrderArray.forEach(
      item => {
        this.mTotalPrice += item.qty * item.price;
      }
    );
  }

  isSelectedItem(item: Product) {
    return this.mOrderArray.indexOf(item) !== -1;
  }

  onClickRemoveOrder(item: Product) {
    const index = this.mOrderArray.indexOf(item);
    this.mOrderArray.splice(index), 1;
    this.countSumPrice();
  }

  onClickPayment() {
    if (this.mTotalPrice > 0) {
      this.mIsPaymentShow = !this.mIsPaymentShow;
    } else {
      alert("order is empty");
    }
  }

  onPaymentCompleted() {
    this.mProductArray = new Array<Product>();
    this.mOrderArray = new Array<Product>();
    this.mTotalPrice = 0;
    this.mIsPaymentShow = false;
    this.feedData();
  }

  alertName(event){
    // alert(event);
  }
}
