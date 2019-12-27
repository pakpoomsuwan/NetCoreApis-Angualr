import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/member/login/login.component';
import { RegisterComponent } from './components/member/register/register.component';
import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';
import { ShopHomeComponent } from './components/shop/shop-home/shop-home.component';
import { AuthGuard } from './services/auth.guard';
import { CheckCancelFormGuard } from './services/check-cancel-form.guard';


const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'stock', component: StockHomeComponent, canActivate:[AuthGuard]},
  {path: 'stock/create', component: StockCreateComponent, canActivate:[AuthGuard], canDeactivate:[CheckCancelFormGuard]},
  {path: 'stock/edit/:id', component: StockEditComponent, canActivate:[AuthGuard], canDeactivate:[CheckCancelFormGuard]},
  {path: 'shop', component: ShopHomeComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'auth/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
