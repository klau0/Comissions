import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
   }, 
   { 
     path: 'signup', 
     loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) 
   },
   {
     path: 'main', 
     loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule)
   },
   {
     path: 'cart',
     loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
   },
   {
     path: '',
     redirectTo: '/login',
     pathMatch: 'full'
   },
   {
     path: '**',
     redirectTo: '/login'
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
