import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDetail } from '../product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  updateProductFormGroup: FormGroup;
  product: ProductDetail;
  productId = '';
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProductById();

    });

    this.updateProductFormGroup = this.fb.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]]
    });
  }

  getProductById(): void {
    this.productsService.getProductById(this.productId).subscribe(res => {
      this.product = res.data;
      this.updateProductFormGroup.get('productName').setValue(this.product.productName);
      this.updateProductFormGroup.get('productDescription').setValue(this.product.productDescription);
      this.updateProductFormGroup.get('productPrice').setValue(this.product.productPrice);
    }, error => {
      console.log(error);
    });
  }

  getProductNameError(): string {
    return this.updateProductFormGroup.get('productName').hasError('required') ? 'Please Enter Product Name' : '';
  }

  getProductDescriptionError(): string {
    return this.updateProductFormGroup.get('productDescription').hasError('required') ? 'Please Enter Product Description' : '';
  }

  getProductPriceError(): string {
    return this.updateProductFormGroup.get('productPrice').hasError('required') ? 'Please Enter Product Price' : '';
  }

  updateProduct(): void {
    console.log(this.updateProductFormGroup.value);
    const data = this.updateProductFormGroup.value;
    this.productsService.editProduct(this.productId, data).subscribe(res => {
      console.log('Product updated');
      this.router.navigate(['/products']);
    }, error => {
      console.log(error);
    });
  }

  backToProductList(): void {
    this.router.navigate(['/products']);
  }

}
