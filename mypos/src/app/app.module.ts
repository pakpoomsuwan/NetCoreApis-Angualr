import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/member/login/login.component';
import { RegisterComponent } from './components/member/register/register.component';
import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/share/header/header.component';
import { MenuComponent } from './components/share/menu/menu.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { ShopHomeComponent } from './components/shop/shop-home/shop-home.component';
import { ShopPaymentComponent } from './components/shop/shop-payment/shop-payment.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NetworkInterceptor } from './services/network.interceptor';
import { MainInterceptor } from './services/main.interceptor';
import { HelloPipe } from './pipes/hello.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StockHomeComponent,
    StockCreateComponent,
    StockEditComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    ShopHomeComponent,
    ShopPaymentComponent,
    HelloPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
