import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getallproduct():Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.url}/products/all`)
  }
 
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.url}/products/delete/${id}`);
  }
      // Méthode pour obtenir les détails d'un produit par son ID
  getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${environment.url}/products/getbyid/${id}`);
      }

  updateProduct(id: number, productData: FormData) {
        return this.http.put(`http://localhost:8088/products/updateproductImg/${id}`, productData, {
          headers: { 'enctype': 'multipart/form-data' } // Optionnel : pour bien spécifier l'envoi d'un fichier
        });
      }

  addProduct(productData:FormData){
    return this.http.post(`${environment.url}/products/ajout`,productData);
  }

  addProductWithProviderAndSubcategory(productRequest: any, idSubcategory: number, idProvider: number): Observable<any> {
    
    return this.http.post(`${environment.url}/products/ajoutImgSubPro/${idSubcategory}/${idProvider}`, productRequest);
  }
  
// Méthode pour récupérer toutes les sous-catégories
getAllSubcategories(): Observable<any> {
  return this.http.get(`${environment.url}/subcategories/all`);
}


}
