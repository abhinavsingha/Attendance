import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private convertedTime: any;
  constructor(private datePipe:DatePipe) {
  }

  async successAlert(title: string, msg: string, icon: string) {
    // Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
    Swal.fire(title, msg, 'success');
  }

  async faliureAlert(title: string, msg: string, icon: string) {
    Swal.fire(title, msg, 'error');
  }

  async warningAlert(title: string, msg: string, icon: string) {
    Swal.fire(title, msg, 'warning');
  }
  convertEpochTo24HourFormat(epochTimestamp:string) {
    const date = new Date(epochTimestamp);
    return(this.datePipe.transform(date, 'HH:mm:ss'));

  }
}
