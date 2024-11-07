import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  constructor(private cartservice:CartService, private productservice:ProductService){}
  cart!: Cart;
  product:any;

ngOnInit(): void {
  this.getCartProducts()
  this.getproduct();
}
getproduct(){
  this. productservice.getallproduct().subscribe((res)=>{
   this.product=res;
   console.log("list product",this.product)
  },(error)=>{
   console.log("Erreur lors de recuperation du produit",error)
  }
 
 );}
getCartProducts(){
this.cartservice.getgetCartProducts().subscribe((res)=>{
  this.cart=res;
  console.log("list cart:",res)
},(error)=>{
  console.log("Error lors de la recuperation de cart",error)
}
);
}
}
