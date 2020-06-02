import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ProjectMaterialModuleModule} from './shared/project-material-module/project-material-module.module';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/services/http-error-interceptor.service';
import { HttpTokenInterceptor } from './shared/services/http-token-interceptor.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegistrationComponent } from './registration/registration.component';
import { SsoComponent } from './sso/sso.component'; 
import { NotificationsComponent } from './notifications/notifications.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    UserDetailsComponent,
    RegistrationComponent,
    SsoComponent,
    NotificationsComponent 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ProjectMaterialModuleModule,
    ReactiveFormsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    FontAwesomeModule
  ],
  entryComponents:[LoginComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
