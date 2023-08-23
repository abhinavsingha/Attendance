import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {
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
}
