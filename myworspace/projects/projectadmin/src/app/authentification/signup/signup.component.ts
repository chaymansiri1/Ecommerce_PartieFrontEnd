import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  signupForm!: FormGroup;
constructor(private auth:AuthentificationService,private fb: FormBuilder,
  private router:Router,){}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      matricule: ['', Validators.required],
      company: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.auth.signup(this.signupForm.value).subscribe(
        (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
    }
  }
}
