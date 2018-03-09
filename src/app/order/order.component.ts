import { Component, OnInit, Input } from '@angular/core';

import { User} from '../models/user';
import { Order} from '../models/order';
import { Room } from '../models/room';

import { RouterModule } from '@angular/router';
import { StatusService } from '../services/status.service';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {
  @Input() user;

  teaq = 0;
  coffeeq = 0;
  waterq = 0;

  date = new Date() ;

  userCol: AngularFirestoreCollection<User>;
  users: Observable<any>;
  roomCol: AngularFirestoreCollection<Room>;
  rooms: Observable<any>;

  constructor( public af: AngularFirestore, public st: StatusService) {

  }

  ngOnInit() {
    this.userCol = this.af.collection('users');
    this.roomCol = this.af.collection('rooms');
    this.getUser();
    this.getRoom();
  }

  getUser() {
    this.users = this.userCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
  }

  getRoom() {
    this.rooms = this.roomCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Order;
          const id = a.payload.doc.id;
          return { id, data };
        });
      });
 }

  MakeOrder( user: String, q: number, q2: number, q3: number, room: String ) {

    this.af.collection('orders').add(
      {
        'name': user,
        'room': room,
        'item': 'Tea',
        'item2': 'Coffee',
        'item3': 'Water',
        'quantity': q,
        'quantity2': q2,
        'quantity3': q3,
        'status': 'Pending',
        'date': this.date
        });
  }

  decreaseT(event) {this.teaq = this.teaq - 1; }

  increaseT(event) {this.teaq = this.teaq + 1; }

  decreaseC(event) {this.coffeeq = this.coffeeq - 1; }
  increaseC(event) {this.coffeeq = this.coffeeq + 1; }

  decreaseW(event) {this.waterq = this.waterq - 1; }
  increaseW(event) {this.waterq = this.waterq + 1; }

}
