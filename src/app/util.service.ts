import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  isDeviceMobile(window): boolean {

    if (window.outerWidth < 400) {
        return true;
    } else {
        return false;
    }

  }



}
