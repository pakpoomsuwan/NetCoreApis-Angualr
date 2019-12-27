import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  mProduct: Product;
  imageSrc: string | ArrayBuffer = null;
  mIsSubmitted = false;

  constructor(private location: Location, private networkService: NetworkService, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.getProduct(params.id);
    });
  }

  ngOnInit() { }

  getProduct(id: any) {
    this.networkService.getProductById(id).subscribe(
      data => {
        this.mProduct = data.result as Product;
        this.mProduct.image = this.networkService.getProductImage(this.mProduct.image);
      },
      error => {
        console.log(error);
      }
    );
  }

  submit() {
    this.networkService.updateProduct(this.mProduct).subscribe(
      data => {
        Swal.fire(
          `Update`,
          `${data.message}`,
          'success'
        );
        this.location.back();
      },
      error => {
        console.log(error);
      }
    );
    this.mIsSubmitted = true;
  }

  goBack() {
    this.location.back();
  }

  onUploadImage(event: any) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.mProduct.image = metaImage;
      };
    }
  }
}
