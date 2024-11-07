import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ListproductComponent } from './components/listproduct/listproduct.component';
import { ProductdetailComponent } from './components/productdetail/productdetail.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"register",component:RegisterComponent},
 
      {
          path: 'home',component: HomeComponent, 
          children: [
            { path: '', component: LayoutComponent },
            {path:"listproduct",component:ListproductComponent},
            { path: 'products/:id', component: ProductdetailComponent },
            {path:'cart',component:CartComponent},

      
      ]}
];
