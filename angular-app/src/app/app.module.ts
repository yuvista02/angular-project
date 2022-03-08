import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';

import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { MatSidenavModule }         from '@angular/material/sidenav';
import { HttpClientModule }         from '@angular/common/http';
import { FormsModule }              from '@angular/forms';

import { SharedModule }             from 'src/app/shared/shared.module';
import { AppLayoutModule }          from 'src/app/app-layout/app-layout.module';
import { DomainModule }             from 'src/app/domain/domain.module';
import { AppRoutingModule }         from 'src/app/app-routing.module';

import { AppComponent }             from 'src/app/app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    AppLayoutModule,
    DomainModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
