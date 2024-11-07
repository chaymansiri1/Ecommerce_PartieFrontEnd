import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification.service';
import { Router, RouterModule } from '@angular/router';
import { patternEmail } from '../../models/pattern';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  signupForm!: FormGroup;
  selectedfile!:File;
constructor(private auth:AuthentificationService,private fb: FormBuilder,
  private router:Router){}
  
  ngOnInit(): void {
   
    this.signupForm = this.fb.group({
     
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern(patternEmail)]],
      password: ['', Validators.required],
      localisation: ['', Validators.required],
      
   
    });
  }
  onFileSelected(event: any): void {
    this.selectedfile = event.target.files[0]; // Récupérer le fichier sélectionné
    console.log("image",this.selectedfile);
  }
 
  onSubmit():void{
 // Vérifier si le formulaire est valide
 if (!this.signupForm.valid) {
  Swal.fire({
    icon: 'error',
    title: 'Customer non ajouté',
    text: 'Inscription echouee'
  });
  
 }
    const formData=new FormData();
    //?("safe navigation operator")
    //  Il vérifie que le champ existe avant d'essayer d'accéder à sa valeur 
    // S'il n'existe pas, cela évite une erreur et retourne undefined.
    formData.append('username',this.signupForm.get('username')?.value);
    formData.append('email',this.signupForm.get('email')?.value);
    formData.append('password',this.signupForm.get('password')?.value);
    formData.append('localisation',this.signupForm.get('localisation')?.value);
  
    if(this.selectedfile){
    formData.append('file',this.selectedfile);
    }
    this.auth.signup(formData)
            .subscribe(
    (response)=>{
      console.log('Customer ajouté avec succes',response);
      alert('Customer ajouté avec succès !');
      this.router.navigate(['/']);
      // Affichage d'une alerte après le succès
   
    },
    (error)=>{
      console.error('Erreur lors de l\'ajout du produit',error);
    }
    );
  
  }
}