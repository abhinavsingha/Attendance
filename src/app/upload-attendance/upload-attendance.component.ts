import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-upload-attendance',
  templateUrl: './upload-attendance.component.html',
  styleUrls: ['./upload-attendance.component.scss']
})
export class UploadAttendanceComponent {
  @ViewChild('invoiceFileInput') invoiceFileInput: any;
  filename: any;
  attendance:any;
  isTableVisible: boolean[]=[false];
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
  ) {}

  invoice: any;

  upload() {
      const file: File = this.invoiceFileInput.nativeElement.files[0];
      // console.log(file);
      const formData = new FormData();
      // console.log(this.formdata.get('file')?.value);
      formData.append('file', file);
      this.apiService.postApiWithToken(this.cons.api.attendanceFileUpload, formData).subscribe({
        next: (v: object) => {

          let result: { [key: string]: any } = v;

          if (result['message'] == 'Success') {
            this.common.successAlert(
              'Success',
              result['response']['msg'],
              'success'
            );
            this.attendance=result['response'].attResponse;
            this.isTableVisible=[];
            for(let j=0;j<Object.keys(this.attendance).length;j++){
              this.isTableVisible.push(false);
            }
          } else {
            this.common.faliureAlert('Please try later', result['message'], '');

          }
        },
        error: (e) => {

          console.error(e);
          this.common.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.log('complete'),
      });
  }
  debug() {
    this.filename=this.invoiceFileInput.nativeElement.files[0].name;
  }

  toggleTable(i:number) {
    this.isTableVisible[i] = !this.isTableVisible[i];
  }

   getobjectKeys(object:any): string[] {

    // this.isTableVisible.push(false);
    // debugger;
    return Object.keys(object);

  }
}
