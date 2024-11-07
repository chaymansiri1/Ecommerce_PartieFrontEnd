import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private cartservice:CartService,private productservice:ProductService){}
  product:any;
  cart!:Cart;
  totalItems: number = 0; // Nouvelle propriété pour le nombre total d'articles

  ngOnInit(): void {
    this.getproduct();
    this.getCartProducts();
  }
getproduct(){
  this.productservice.getallproduct().subscribe((res)=>{
    this.product=res;
    console.log("list product",this.product)
    },(error)=>{
      console.log("Erreur lors de la recuperation du produit",error)
    });
}
getCartProducts(){
  this.cartservice.getgetCartProducts().subscribe((res)=>{
    this.cart=res;
console.log("list cart:",res)
this.updateTotalItems(); // Mettez à jour le nombre total d'articles
  },(error)=>{
    console.log("Error lors de la recuperation de cart",error)
  });
}
updateTotalItems() {
  if (this.cart && this.cart.products) {
    //reduce: itérer sur le tableau products du panier et accumuler une valeur
    // acc : l'accumulateur qui maintient la somme actuelle des quantités d'articles. Il commence à 0
    // product : représente chaque produit dans le tableau products
    // product.qte_user : Pour chaque produit, on récupère sa quantité (qte_user) et on l'ajoute à l'accumulateur (acc).
    this.totalItems = this.cart.products.reduce((acc: number, product: any) => acc + product.qte_user, 0);
  }
  // La méthode updateTotalItems() calcule le nombre total d'articles dans le panier en additionnant les quantités (qte_user) de chaque produit présent dans le panier (cart).
}
}
