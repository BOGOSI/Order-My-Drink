import { Component, OnInit } from '@angular/core';
import { Order} from '../models/order';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-completedorders',
  templateUrl: './CompletedOrders.component.html',
  styleUrls: ['./CompletedOrders.component.css']
})
export class CompletedOrdersComponent implements OnInit {

  orderCol: AngularFirestoreCollection<Order>;
  orders: Observable<any>;

  OrderDoc: AngularFirestoreDocument<Order>;
  order: Observable<Order>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.orderCol = this.afs.collection('orders' , ref => ref.where('status', '==', 'Completed').limit(10));

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
