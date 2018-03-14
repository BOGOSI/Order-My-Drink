import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app/app-routing.module';

import { environment } from '../environments/environment';

import { OrderComponent } from '../app/order/order.component';
import { KitchenComponent } from '../app/kitchen/kitchen.component';
import { StatusComponent } from '../app/status/status.component';
import { AddUsersComponent } from '../app/AddUsers/AddUsers.component';
import { AcceptedOrdersComponent } from '../app/AcceptedOrders/AcceptedOrders.component';
import { CompletedOrdersComponent } from '../app/CompletedOrders/CompletedOrders.component';
import { DeclinedOrdersComponent } from '../app/DeclinedOrders/DeclinedOrders.component';

import { OrderService } from '../app/services/order.service';
import { KitchenService } from './services/kitchen.service';
import { StatusService } from './services/status.service';


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    KitchenComponent,
    StatusComponent,
    AddUsersComponent,
    AcceptedOrdersComponent,
    CompletedOrdersComponent,
    DeclinedOrdersComponent,
  ],
  imports: [
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'coffeeisorder'),
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [KitchenService, StatusService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
