import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css'
})
export class DetailproductComponent implements OnInit{
  product!: Product;

constructor(private productService:ProductService,
  private route:ActivatedRoute){}
id:any;
ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.id = params['id'];
    this.getProductDetails();
  });
}
getProductDetails(): void {
  this.productService.getProductById(this.id).subscribe(
    (product) => {
      this.product = product;
      console.log("list of product", this.product)
  
    },
    (error) => {
      console.error('Erreur lors de la récupération des détails du produit', error);
    }
  );
}
}
