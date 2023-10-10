import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { loginAuthGuard } from './login-auth.guard';
import { logoutAuthGuard } from './logout-auth.guard';

const routes: Routes = [
  {
    path:'category/:type',
    component: ProductDisplayComponent,
    canActivate:[loginAuthGuard]
  },
  {
    component:ProductDetailsComponent,
    path:'product_display/:id',
    canActivate:[loginAuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[logoutAuthGuard]
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[loginAuthGuard]
  },
  {
    path:'',
    component:LoginComponent,
    canActivate:[logoutAuthGuard]
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[loginAuthGuard]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[loginAuthGuard]
  },
  {
    path:'wishlist',
    component:WishlistComponent,
    canActivate:[loginAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
