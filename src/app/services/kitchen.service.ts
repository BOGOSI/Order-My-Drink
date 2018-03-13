import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Order} from '../models/order';
import { Observable} from 'rxjs/Observable';

@Injectable()
export class KitchenService {
  ordersCollection: AngularFirestoreCollection<Order>;
  Order: Observable<Order[]>;

  constructor(public orders: AngularFirestore) {
     this.Order = this.orders.collection('/orders', ref => ref.where('status', '==', 'Pending')).valueChanges();

   }

  getOrders() {
    return this.Order;
  }

}

