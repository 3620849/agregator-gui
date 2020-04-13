import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SsoComponent } from './sso/sso.component';


const routes: Routes = [
{path:'', loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule)},
{path:'login',component:LoginComponent},
{path:'sso',component:SsoComponent},
{path:'forum', loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule)},
{ path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
