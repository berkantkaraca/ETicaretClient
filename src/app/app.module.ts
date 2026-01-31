import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("accessToken"), // accessToken'ı localStorage'dan alır ve otomatik olarak tüm istekleklerde authorization header'ına ekler
        allowedDomains: ["localhost:7225"], // Token'ı sadece belirlenen domainlere gönderir
        disallowedRoutes: [] // Token'ın gönderilmeyeceği route'lar
      }
    })
  ],
  providers: [
    {provide: "baseUrl", useValue: "https://localhost:7225/api", multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
