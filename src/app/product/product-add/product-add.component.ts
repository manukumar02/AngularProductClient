import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {
  addProductFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addProductFormGroup = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]]
    });
  }

  getProductNameError(): string {
    return this.addProductFormGroup.get('productName').hasError('required') ? 'Please Enter Product Name' : '';
  }

  getProductDescriptionError(): string {
    return this.addProductFormGroup.get('productDescription').hasError('required') ? 'Please Enter Product Description' : '';
  }

  getProductPriceError(): string {
    return this.addProductFormGroup.get('productPrice').hasError('required') ? 'Please Enter Product Price' : '';
  }

  saveProduct(): void {
    console.log(this.addProductFormGroup.value);
    const data = this.addProductFormGroup.value;
    this.productsService.addProduct(data).subscribe(res => {
      this.router.navigate(['/products']);
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  backToProductList(): void {
    this.router.navigate(['/products']);
  }
}
