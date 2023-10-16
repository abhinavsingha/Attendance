import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epochToDate'
})
export class EpochToDatePipe implements PipeTransform {

  transform(epoch: number): string {
    const date = new Date(epoch); // Convert seconds to milliseconds
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    console.log(date);
    return `${day}/${month}/${year}`;
  }
}
