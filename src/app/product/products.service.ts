import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductDetail } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProductById(productId): Observable<any> {
    return this.http.get(`${this.url}/${productId}`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  addProduct(product: Product): Observable<any> {
    const data = {
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: +product.productPrice
    };
    console.log(data);
    return this.http.post(`${this.url}/add`, data);
  }

  editProduct(productId, product: ProductDetail): Observable<any> {
    const data = {
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: +product.productPrice
    };
    return this.http.put(`${this.url}/update/${productId}`, data);
  }

  deleteProduct(id): Observable<any> {
    return this.http.delete(`${this.url}/delete/${id}`);
  }
}
