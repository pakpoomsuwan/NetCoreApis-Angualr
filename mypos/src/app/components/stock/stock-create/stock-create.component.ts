import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = new Product();
  imageSrc: string | ArrayBuffer = null;
  mIsSubmitted = false;

  constructor(private location: Location, private networkService: NetworkService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.networkService.createProduct(this.mProduct).subscribe(
      data => {
        Swal.fire(
          `New Product`,
          `success`,
          'success'
        );

        this.router.navigate(['/stock']);
      },
      error => {
        console.log(JSON.stringify(error));
        Swal.fire(
          `New Product`,
          `not success`,
          'error'
        );
      }
    );
    this.mIsSubmitted = true;
  }

  goBack() {
    this.location.back();
  }

  onUploadImage(event) {
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
