import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getallproduct(){
    return this.http.get(`${environment.url}/products/all`);
  }

  getProductById(id: number){
    return this.http.get(`${environment.url}/products/getbyid/${id}`);
  }
  getAllProduct(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.url}/products/all`)
      .pipe(
        // catchError(this.handleError)
      );
  }
  getallsubcategorie():Observable<any[]> {
    return this.http.get<any[]>(`${environment.url}/subcategories/all`)
      .pipe(
        // catchError(this.handleError)
      );
  }
  addProductToCart(productId: number, quantity: number ): Observable<any> {

  return this.http.post<any>(`${environment.url}/carts/add/${productId}?quantity=${quantity}`,
      null);
  
}
}
