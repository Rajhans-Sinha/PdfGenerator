import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { ParentComponent } from './parent/parent.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {HTTPInterceptor} from '/Project/PDFGeneratorProject/src/app/HTTPInterceptor'

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    ParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    ToastrModule.forRoot(), 
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HTTPInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
