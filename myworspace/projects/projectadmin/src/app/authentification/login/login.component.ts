import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  signinForm!:FormGroup
  user:any;
constructor(private authen:AuthentificationService,
  private fb:FormBuilder,
  private router:Router,){}

  ngOnInit(): void {
    this.signinForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
    this.user = this.authen.getUserData();  // Récupérer les informations utilisateur
  }

  onSubmit():void{
    if(this.signinForm.valid){
      this.authen.signin(this.signinForm.value).subscribe(
        (response)=>{
          console.log('sigin success',response);

           // Sauvegarde du token et des informations utilisateur dans le localStorage
           this.authen.saveUserData(response.token, {
            id: response.id,
            username: response.username,
            email: response.email,
            roles: response.roles
          });

          this.router.navigate(['/home/']);
        },
        (error)=>{
          console.log("signin failed");
        }
        )
    }
  }

  logout(): void {
    this.authen.logout();
    this.router.navigate(['/signin']);  // Rediriger vers la page de connexion
  }
  
}
