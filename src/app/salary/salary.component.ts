import {Component, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent {
  @ViewChild('invoiceFileInput') invoiceFileInput: any;
  filename: any;
  attendance: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
  ) {}
  get objectKeys(): string[] {
    return Object.keys(this.attendance);
  }
  invoice: any;
  upload(key: string) {
    const file: File = this.invoiceFileInput.nativeElement.files[0];
    // console.log(file);
    const formData = new FormData();
    // console.log(this.formdata.get('file')?.value);
    formData.append('file', file);
    this.apiService.postApiWithToken(this.cons.api.uploadSalary, formData).subscribe({
      next: (v: object) => {

        let result: { [key: string]: any } = v;

        if (result['message'] == 'Success') {
          this.common.successAlert(
            'Success',
            result['response']['msg'],
            'success'
          );
          this.attendance=result['response'].response;
          debugger;
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
  // viewFile(file: string) {
  //   this.apiService.getApi(this.cons.api.fileDownload + file).subscribe(
  //     (res) => {
  //       let result: { [key: string]: any } = res;
  //       this.openPdfUrlInNewTab(result['response'].pathURL);
  //       // console.log(result['response'].pathURL);
  //     },
  //     (error) => {
  //       console.error(error);
  //
  //     }
  //   );
  // }
  //
  // openPdfUrlInNewTab(pdfUrl: string): void {
  //   window.open(pdfUrl, '_blank');
  // }

  debug() {
    this.filename=this.invoiceFileInput.nativeElement.files[0].name;
    debugger;
  }
}
