import { Component, OnInit } from '@angular/core';

import { Order } from '../models/order';
import { OrderComponent } from '../order/order.component';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
    status: boolean;
    statusValue: string;
  constructor(public af: AngularFirestore) { }

  ngOnInit() {
      this.status = false;
      this.statusValue = 'Pending';
    }

    done() {
      this.statusValue = 'Completed';
    }

}
