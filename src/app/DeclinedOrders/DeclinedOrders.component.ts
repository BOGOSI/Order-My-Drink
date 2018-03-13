import { Component, OnInit } from '@angular/core';
import { Order} from '../models/order';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-declinedorders',
  templateUrl: './DeclinedOrders.component.html',
  styleUrls: ['./DeclinedOrders.component.css']
})
export class DeclinedOrdersComponent implements OnInit {

  orderCol: AngularFirestoreCollection<Order>;
  orders: Observable<any>;

  OrderDoc: AngularFirestoreDocument<Order>;
  order: Observable<Order>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.orderCol = this.afs.collection('orders' , ref => ref.where('status', '==', 'Declined').limit(10));

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
