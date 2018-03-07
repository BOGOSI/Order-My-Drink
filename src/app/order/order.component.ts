import { Component, OnInit } from '@angular/core';
import { User} from '../models/user';
import { Order} from '../models/order';
import { Room } from '../models/room';
import { RouterModule } from '@angular/router';
import { OrderService } from '../services/order.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {
  teaq = 0;
  coffeeq = 0;
  waterq = 0;

  Order: Observable<Order[]>;

  users: User[];
  rooms: Room[];
  date: Date;

  constructor(private orderservice: OrderService, public orders: AngularFirestore) {
    this.Order = this.orders.collection('orders').valueChanges();
    this.date = new Date();
  }

  ngOnInit() {

    this.orderservice.getUsers().subscribe(Users => { this.users = Users; });

    this.orderservice.getRooms().subscribe(Rooms => {this.rooms = Rooms; });

    console.log(`rooms`, this.rooms, this.date);

  }


  MakeOrder( user: String, q: number, q2: number, q3: number, room: String, date: Date) {

    this.orders.collection('orders').add(
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
    console.log(user, 'Ordered: ', q, q2, q3, room , ' in room: ', 'Date: ', this.date);
  }

  decreaseT(event) {this.teaq = this.teaq - 1; }

  increaseT(event) {this.teaq = this.teaq + 1; }

  decreaseC(event) {this.coffeeq = this.coffeeq - 1; }
  increaseC(event) {this.coffeeq = this.coffeeq + 1; }

  decreaseW(event) {this.waterq = this.waterq - 1; }
  increaseW(event) {this.waterq = this.waterq + 1; }





}
