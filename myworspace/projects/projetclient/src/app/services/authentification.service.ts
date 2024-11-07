import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }
  signup(singnuprequest:any):Observable<any>{
    return this.http.post(`${environment.url}/customers/registerImg`,singnuprequest);
  }
  signin(signinrequest:any):Observable<any>{
    return this.http.post(`${environment.url}/customers/signin`,signinrequest);
  }

  // Méthode pour enregistrer les informations utilisateur dans le localStorage
  saveUserData(Token: string, user: any): void {
    localStorage.setItem('accessToken', Token);  // Stocke le JWT
    localStorage.setItem('user', JSON.stringify(user));  // Stocke d'autres informations utilisateur
  }

  // Méthode pour récupérer les données utilisateur
  getUserData(): any {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

   // Méthode pour récupérer le token
   getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

    // Optionnel: Vérifie si l'utilisateur est connecté
    isLoggedIn(): boolean {
      return !!this.getToken();
    }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  getUserById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${environment.url}/customers/getbyid/${id}`);
  }
 
}
