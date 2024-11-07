import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';

@Component({
  selector: 'app-listproduct',
  standalone: true,
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FormsModule,SearchFilterPipe],
  templateUrl: './listproduct.component.html',
  styleUrl: './listproduct.component.css'
})
export class ListproductComponent implements OnInit{
products:Product[]=[];
product!: Product;
updateForm!: FormGroup;
addform!:FormGroup;
selectedfile!:File;
id!: number;
subcategories: any[] = [];  // Stocker les sous-catégories

searchText = '';  // Variable pour la recherche

  constructor(private productService:ProductService,
    private router:Router,private fb: FormBuilder,
  private route:ActivatedRoute){}
  
ngOnInit(): void {
  this.loadSubcategories();  // Charger les sous-catégories dès l'initialisation
  this.id = this.route.snapshot.params['id'];

  this.getproducts();

  this.updateForm = this.fb.group({
    name:['',Validators.required],
    ref:['',Validators.required],
    color:['',Validators.required],
    qte:['',Validators.required],
    qte_en_stock:['',Validators.required],
    price:['',Validators.required],
    description:['',Validators.required],
    
  });

  
  this.addform=this.fb.group({
    name:[''],
    ref:[''],
    color:[''],
    qte:[''],
    qte_en_stock:[''],
    price:[''],
    description:[''],
    subcategory: ['', Validators.required]  // Pour sélectionner une sous-catégorie

  });
}
productId!:number;

getProductDetails(id:any): void {
  this.productService.getProductById(id).subscribe(
    (product) => {
      this.productId=product.id;
      this.product = product;
      this.updateForm.patchValue({
        name:this.product.name,
        ref:this.product.ref,
        color:this.product.color,
        qte:this.product.qte,
        qte_en_stock:this.product.qte_en_stock,
        price:this.product.price,
        description:this.product.description,
      })
      console.log("detail of product", this.product)
      console.log("product id",this.productId)
  
    },
    (error) => {
      console.error('Erreur lors de la récupération des détails du produit', error);
    }
  );
}

// getProductDetail(): void {
//   this.productService.getProductById(this.id).subscribe(
//     (product) => {
//       this.product = product;
//       this.updateForm.patchValue(this.product);  // Charger les valeurs dans le formulaire
//     },
//     (error) => {
//       console.error('Erreur lors de la récupération des détails du produit', error);
//     }
//   );
// }

onFileSelected(event: any): void {
  this.selectedfile = event.target.files[0]; // Récupérer le fichier sélectionné
  console.log("image",this.selectedfile);
}

// Charger toutes les sous-catégories depuis le backend
loadSubcategories(): void {
  this.productService.getAllSubcategories().subscribe(
    (data) => {
      this.subcategories = data;
      console.log("list subcategory",data);
    },
    (error) => {
      console.error('Erreur lors du chargement des sous-catégories', error);
    }
  );
}


onSubmitt():void{
  const formData=new FormData();
  //?("safe navigation operator")
  //  Il vérifie que le champ existe avant d'essayer d'accéder à sa valeur 
  // S'il n'existe pas, cela évite une erreur et retourne undefined.
  formData.append('name',this.addform.get('name')?.value);
  formData.append('ref',this.addform.get('ref')?.value);
  formData.append('color',this.addform.get('color')?.value);
  formData.append('qte',this.addform.get('qte')?.value);
  formData.append('qte_en_stock',this.addform.get('qte_en_stock')?.value);
  formData.append('price',this.addform.get('price')?.value);
  formData.append('description',this.addform.get('description')?.value);
  formData.append('subcategoryId', this.addform.get('subcategoryId')?.value);
  // formData.append('providerId', localStorage.getItem('idProvider.id')!);  // ID du fournisseur depuis le localStorage

if(this.selectedfile){
  formData.append('file',this.selectedfile);
}

 // Récupérer l'ID du fournisseur depuis le localStorage
 const idProvider = JSON.parse(localStorage.getItem('user')!);
 const idSubcategory = this.addform.value.subcategory;

this.productService.addProductWithProviderAndSubcategory(formData, idSubcategory, idProvider.id)
          .subscribe(
  (response)=>{
    console.log('product ajoute avec succes',response);
    this.getproducts();
    this.addform.reset();
    // Affichage d'une alerte après le succès
    alert('Produit ajouté avec succès !');
  },
  (error)=>{
    console.error('Erreur lors de l\'ajout du produit',error);
  }
  );

}


onSubmit():void{
  const formData=new FormData();
  formData.append('name',this.updateForm.get('name')?.value);
  formData.append('ref',this.updateForm.get('ref')?.value);
  formData.append('color',this.updateForm.get('color')?.value);
  formData.append('qte',this.updateForm.get('qte')?.value);
  formData.append('qte_en_stock',this.updateForm.get('qte_en_stock')?.value);
  formData.append('price',this.updateForm.get('price')?.value);
  formData.append('description',this.updateForm.get('description')?.value);

  if(this.selectedfile){
    formData.append('file',this.selectedfile);// Ajouter l'image au FormData
  }
  this.productService.updateProduct(this.productId, formData).subscribe(
    (response) => {
      console.log('Produit mis à jour avec succès', response);
      this.getproducts();
      // this.router.navigate(['/listproduct']);
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du produit', error);
    }
  );
}
getproducts(){
  this.productService.getallproduct().subscribe(
    (data)=>{
      this.products=data;
      console.log("list of product",this.products)
    },
    (error)=>{
      console.error("erreur lors de la recuperation des produits:",error)
    }
  );
}

deleteProduct(id: number) {
  if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        console.log('Produit supprimé avec succès', response);
        // Mettre à jour la liste des produits après suppression
        this.getproducts();
        // this.router.navigate(['/listproduct']);
      },
      (error) => {
        console.error('Erreur lors de la suppression du produit', error);
      }
    );
  }
}
}
