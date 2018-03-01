import { Component, OnInit, Input  } from '@angular/core';

import { order} from '../models/order';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
    @Input() order: order;

    constructor() { }

    ngOnInit() { }
}