import { Component, OnInit, Input  } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Order} from '../models/order';
import { Observable} from 'rxjs/observable';

@Component({
    selector: 'app-acceptedorders',
    templateUrl: './acceptedorders.component.html',
    styleUrls: ['./acceptedorders.component.css']
})
export class AcceptedOrdersComponent implements OnInit {
    @Input()

    Order: AngularFirestoreCollection<Order> ;
    orders: any;
    constructor(private af: AngularFirestore ) {
    }

    ngOnInit() {
      this.Order = this.af.collection('orders', ref => ref.where('status', '==', 'Accepted').limit(10));
      this.orders = this.Order.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
     }

  }
