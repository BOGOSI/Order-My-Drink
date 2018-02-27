import { Component, OnInit } from '@angular/core';
import { AngularFireModule, AngularFireDatabase, FirebaseListObservable} from 'angularfire';
import * as firebase from 'firebase/app';


@Component({
  selector: 'kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {

  users:FirebaseListObservable<any>;;
    constructor(db2: AngularFireDatabase) {
    this.users = db2.list('users');
          }

  ngOnInit() {
  }

}
