import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { ConnectionsService } from 'src/app/services/connections.service';
import { IssuesListComponent } from './components/issues-list/issues-list.component';
import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesListComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ConnectionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
