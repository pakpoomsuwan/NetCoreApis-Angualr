import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  mProductArray: Product[] = [];

  mSearchText = new Subject<string>();

  constructor(private router: Router, private networkService: NetworkService) { }

  ngOnInit() {
    this.mSearchText.pipe(
      debounceTime(1000)
    ).subscribe(
      word => {
        this.searchProduct(word);
      }
    );
    this.feedData();
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        const product = data.result as Product[];
        this.mProductArray = product.map(item => {
          item.image = this.networkService.getProductImage(item.image);
          return item;
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  checkOutOfStock(): number {
    return this.mProductArray.filter(
      item => {
        if(item.stock <= 0)
          return item;
      }
    ).length;
  }

  searchProduct(word: string) {
    console.log(word);
  }

  editProduct(id: number) {
    this.router.navigate([`/stock/edit/${id}`]);
  }

  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
          this.networkService.deleteProduct(id).subscribe(
            data => {
              Swal.fire(
                `Deleted! ${id}`,
                'Your file has been deleted.',
                'success'
              );

              this.feedData();
            },
            error =>{
              Swal.fire(
                `Deleted! ${id}`,
                'Not Success.',
                'error'
              );
            }
          );
      }
    });
  }
}
