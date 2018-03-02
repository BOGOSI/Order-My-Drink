import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import {order} from '../models/order';
import { Observable} from 'rxjs/observable';

@Injectable()
export class KitchenService {
  ordersCollection: AngularFirestoreCollection<order>;

  Order:Observable<order[]>;

  constructor(public orders:AngularFirestore,public users:AngularFirestore) {
    this.Order = this.orders.collection('orders').valueChanges();
   }

  getOrders(){
    return this.Order;
  }



}

