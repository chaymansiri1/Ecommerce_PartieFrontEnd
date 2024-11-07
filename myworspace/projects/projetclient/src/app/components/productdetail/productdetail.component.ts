import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  standalone: true,
  imports: [],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductdetailComponent {

  product!: any;
  productQuantity: number = 1; // Quantité initiale
  errorMessage: string = ''; // Variable pour stocker le message d'erreur
 

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }
id:any
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
  incrementQuantity(): void {
    if (this.productQuantity < this.product.qte_en_stock) {
      this.productQuantity++;
      this.errorMessage = ''; // Effacer le message d'erreur si tout va bien
    } else {
      this.errorMessage = "Quantité insuffisante en stock";
    }
  }
  decrementQuantity(): void {
    if (this.productQuantity > 1) {
      this.productQuantity--;
      this.errorMessage = ''; // Effacer le message d'erreur
    }}

  addToCart(productId: number): void {
   
    this.productService.addProductToCart(productId, this.productQuantity).subscribe(
      (response) => {
        if (response.status === 'Success') {
          console.log(response.message);
          alert('Produit ajouté au panier avec succès');
        } else {
          console.error(response.message);
          alert('Erreur: ' + response.message);
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout au panier', error);
        alert('Erreur: ' + error.message);
      }
    );
  }
}
