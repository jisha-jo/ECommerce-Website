import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'category/:type',
    component: ProductDisplayComponent
  },
  {
    component:ProductDetailsComponent,
    path:'product_display/:id'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'cart',
    component:CartComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
