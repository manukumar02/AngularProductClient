export class Product {
    productName: string;
    productDescription: string;
    productPrice: number;
}

export class ProductDetail {
    _id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
}

export class ProductResponse {
    success: boolean;
    message: string;
    data: ProductDetail[];
}
