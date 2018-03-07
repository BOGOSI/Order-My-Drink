import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { KitchenComponent } from '../app/kitchen/kitchen.component';
import { OrderComponent } from '../app/order/order.component';
import { StatusComponent } from '../app/status/status.component';


const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  { path: 'kitchen', component: KitchenComponent },
  { path: 'order', component: OrderComponent },
  { path: 'status', component: StatusComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
