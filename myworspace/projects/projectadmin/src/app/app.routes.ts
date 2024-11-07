import { Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { ProfilComponent } from './components/profil/profil.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"signup",component:SignupComponent},
      {
        
          path: 'home',component: HomeComponent,canActivate: [authGuard], 
          children: [
            { path: '', component: LayoutComponent },
            {path:"listproduct",component:ListproductComponent},
            { path: 'products/:id', component: DetailproductComponent},
            { path: 'profil', component: ProfilComponent},
          ]}
];
