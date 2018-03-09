import { Injectable } from '@angular/core';

import { Order } from '../models/order';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Injectable()
export class StatusService {

  orderCol: AngularFirestoreCollection<Order>;
  orders: Observable<any>;
  date: Date;
  user: string;

  constructor(public af: AngularFirestore) { }

  getOrder(user) {
    this.orderCol = this.af.collection('orders');
    this.orders = this.orderCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }
}
