import { Component, OnInit } from '@angular/core';
import { Product, ProductDetail, ProductResponse } from '../product.model';
import { ProductsService } from '../products.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: ProductDetail[];
  displayedColumns = ['id', 'name', 'description', 'price', 'action'];
  dataSource: MatTableDataSource<ProductDetail>;
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.productsService.getProducts().subscribe((res: ProductResponse) => {
      this.products = res.data;
      this.dataSource = new MatTableDataSource<ProductDetail>(this.products);
    }, error => {
      console.log(error);
    });
  }

  editProduct(product): void {
    console.log(product);
    this.router.navigate(['/edit', product._id]);
  }

  deleteProduct(product: ProductDetail): void {
    console.log(product);
    this.productsService.deleteProduct(product._id).subscribe(res => {
      console.log(res);
      this.getProductList();
    }, error => {
      console.log(error);
    });
  }

}
