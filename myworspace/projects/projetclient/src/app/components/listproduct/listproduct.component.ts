import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listproduct',
  standalone: true,
  imports: [RouterModule,NgxSliderModule,FormsModule],
  templateUrl: './listproduct.component.html',
  styleUrl: './listproduct.component.css'
})
export class ListproductComponent implements OnInit {
  product:any;
  subcategory:any;
  selectedColor: string | null = null;
  selectedValues:string [] =[] ;

  productQuantity: number = 1; 

  listproduct:any;
  priceselection = '';
  minValue: number = 50;
  maxValue: number = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000,
  };

  constructor(private productservice:ProductService){}

  ngOnInit(): void {
    this.getproduct()
    this.getallsubcategorie()
  }
  getproduct(){
   this. productservice.getallproduct().subscribe((res)=>{
    this.product=res;
    console.log("list product",this.product)
   },(error)=>{
    console.log("Erreur lors de recuperation du produit",error)
   }
  
  );
  }
  getallsubcategorie() {
    this.productservice.getallsubcategorie().subscribe((rest: any) => {
      this.subcategory = rest;
      console.log('list of subcategorie', this.subcategory);
    },(error)=>{
      console.log("Erreur lors de recuperation du subcategorie",error)
     });
  }

  filterByColor(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedValue = target.value;
  
    if (this.selectedColor === selectedValue) {
      this.selectedColor = null; // Désélectionnez la couleur si elle est déjà sélectionnée
    } else {
      this.selectedColor = selectedValue; // Sélectionnez la nouvelle couleur
    }
  
    // Appelez l'API pour récupérer les produits
    this.productservice.getAllProduct().subscribe(
      (products: any[]) => { // Utiliser directement 'products' comme tableau
        // Filtrer les produits en fonction de la couleur sélectionnée
        this.product = this.selectedColor
          ? products.filter((product: any) => product.color === this.selectedColor)
          : products; // Si aucune couleur n'est sélectionnée, affichez tous les produits
        console.log(this.selectedColor
          ? 'La liste des produits filtrée :'
          : 'Tous les produits :',
          this.product);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }

  getProductBySubcategory(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedValues.push(checkbox.value);
    } else {
      this.selectedValues = this.selectedValues.filter(
        (value) => value !== checkbox.value
      );
    }
    this.productservice.getAllProduct().subscribe(
      (rest: any) => {
        console.log("resultat",rest)
      if (this.selectedValues.length === 0) {
        this.product = rest;
        console.log('all products', this.product);
      } else {
        this.product = rest.filter((product: any) =>
          this.selectedValues.includes(product.subcategory.id.toString())
        );
        console.log('filtred list ', this.product);
      }
    });
  }
  
  changePrice(): void {
    console.log('Price change event:', this.priceselection);
    // Vérifiez si priceselection est défini
    if (!this.priceselection) {
      console.warn('No price selection provided.');
      return; // Quitte la méthode si aucune sélection de prix
    }
    // Récupération de la liste des produits
    this.productservice.getAllProduct().subscribe(
      (products: any) => {
        // Remplacez Product par le type approprié
        this.product = products;
        const [minPrice, maxPrice] = this.priceselection;
        // Filtrer les produits par prix
        this.product = this.product.filter(
          (product: Product) =>
            product.price >= minPrice && product.price <= maxPrice
        );
        console.log('Filtered products by price:', this.product);
      },
      (error) => {
        console.error('Error fetching products:', error);
        // Vous pouvez également afficher un message d'erreur à l'utilisateur ici
      }
    );
  }
 
}
