import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RemoveDialogComponent } from './main-page/remove-dialog/remove-dialog.component';
import { ModifyDialogComponent } from './main-page/modify-dialog/modify-dialog.component';
import { AddKindDialogComponent } from './main-page/add-kind-dialog/add-kind-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    RemoveDialogComponent,
    ModifyDialogComponent,
    AddKindDialogComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  entryComponents: [
    RemoveDialogComponent,
    ModifyDialogComponent,
    AddKindDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
