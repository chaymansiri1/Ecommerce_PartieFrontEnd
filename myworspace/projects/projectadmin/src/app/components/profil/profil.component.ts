import { Component, OnInit } from '@angular/core';
import { Provider } from '../../models/provider';
import { AuthentificationService } from '../../services/authentification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  provider!: Provider; // Déclarez provider de type AppProvider
  updateForm!: FormGroup; // Formulaire réactif
  selectedfile!:File;
  constructor(private auth: AuthentificationService,private fb: FormBuilder) { }

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user')!); // Récupérer l'ID de l'utilisateur stocké dans le localStorage
    if (userId) {
      this.auth.getUserById(userId.id).subscribe(data => {
        this.provider = data; // Stockez les données utilisateur récupérées
        this.initializeForm(); // Initialiser le formulaire après la récupération des données
        console.log("profile provider",data);
      });
    }
  }
   // Initialisation du formulaire réactif avec les données de l'utilisateur
   initializeForm(): void {
    this.updateForm = this.fb.group({
      username: [this.provider.username, Validators.required],
      email: [this.provider.email, [Validators.required, Validators.email]],
      matricule: [this.provider.matricule, Validators.required],
      company: [this.provider.company, Validators.required]
    });
  }
  getProviderDetails(): void {
    // Récupérer les informations de l'utilisateur connecté dans le localStorage
    const userId = JSON.parse(localStorage.getItem('user')!);
  
    if (userId) {
      this.auth.getUserById(userId.id).subscribe(
        (provider) => {
          this.provider = provider; // Stocker les informations récupérées
  
          // Mettre à jour le formulaire avec les valeurs du provider
          this.updateForm.patchValue({
            username: this.provider.username,
            email: this.provider.email,
            matricule: this.provider.matricule,
            company: this.provider.company
          });
  
          console.log('Détails du provider récupérés:', this.provider);
        },
        (error) => {
          console.error('Erreur lors de la récupération des détails du provider', error);
        }
      );
    } else {
      console.error('Aucun utilisateur connecté trouvé dans le localStorage');
    }
  }
 
  onFileSelected(event: any): void {
    this.selectedfile = event.target.files[0]; // Récupérer le fichier sélectionné
    console.log("image",this.selectedfile);
  }

   // Méthode pour soumettre les modifications
   onSubmit(): void {
    const formData=new FormData();
  formData.append('username',this.updateForm.get('username')?.value);
  formData.append('email',this.updateForm.get('email')?.value);
  formData.append('matricule',this.updateForm.get('matricule')?.value);
  formData.append('company',this.updateForm.get('company')?.value);
 
  if(this.selectedfile){
    formData.append('file',this.selectedfile);// Ajouter l'image au FormData
  }
  this.auth.updateProviderImg(this.provider.id, formData).subscribe(
    (response) => {
      console.log('Provider mis à jour avec succès', response);
      // this.getproducts();
      // this.router.navigate(['/listproduct']);
      alert('Provider mis à jour avec succès');
    },
    (error) => {
      console.error('Erreur lors de la mise à jour du provider', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  );
}
}
