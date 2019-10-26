import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TableComponent } from './table/table.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  /** config ng-zorro-antd i18n (language && date) **/
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppModule { }
