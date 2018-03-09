import { Injectable } from '@angular/core';

import { StatusComponent } from '../status/status.component';

import {  } from '../status/status.component';
@Injectable()
export class StatusService {

  status: string;

  constructor() {  }

  Accepted() {
   return this.status = 'Accepted';
  }

  Completed() {
   return this.status = 'Completed';
  }

  Declined() {
    return this.status = 'Declined';
  }

}
