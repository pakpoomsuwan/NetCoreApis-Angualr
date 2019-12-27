import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { login, register } from '../models/auth.model';
import { ProductResponse, Product } from '../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  login(data): Observable<login> {
    return this.httpClient.post<login>("/auth/login", data);
  }

  register(data): Observable<register> {
    return this.httpClient.post<register>("/auth/register", data);
  }

  getProductAll(): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>("/product");
  }

  getProductById(id): Observable<ProductResponse>{
    return this.httpClient.get<ProductResponse>(`/product/${id}`);
  }

  getProductImage(imagePath): string {
    if (imagePath === '' || imagePath === null)
      return 'assets/images/no_photo.jpg';
    else
      return `${environment.baseAPIURL}/product/images/${imagePath}`;
  }

  createProduct(data: Product): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>("/product", this.makeProductForm(data));
  }

  updateProduct(data: Product): Observable<ProductResponse>{
    return this.httpClient.put<ProductResponse>(`/product/${data.productId}`, this.makeProductForm(data));
  }

  deleteProduct(id): Observable<ProductResponse> {
    return this.httpClient.delete<ProductResponse>("/product/" + id);
  }

  makeProductForm(data) {
    const fromData = new FormData();
    fromData.append("name", data.name);
    fromData.append("stock", data.stock);
    fromData.append("price", data.price);
    fromData.append("image", data.image);

    return fromData;
  }
}
