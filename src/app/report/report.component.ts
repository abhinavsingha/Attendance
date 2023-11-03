import { Component, OnInit } from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import * as FileSaver from "file-saver";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit{
  employee: any;
  fromDate: any;
  toDate: any;
  role: any;
  response: any;
  isTableVisible: any[]=[];
  constructor(
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private datePipe:DatePipe
  ) {}
ngOnInit(): void {
  $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    $.getScript('../../assets/js/jquery-ui.min.js');
    this.common.getAllEmployee();
    this.role=localStorage.getItem('role');

}


  getAttendanceReport() {
    let json={};
    if(this.role=='Admin'){
      json={startDate:this.datePipe.transform(this.fromDate,'dd/MM/yyyy'),
        endDate:this.datePipe.transform(this.toDate,'dd/MM/yyyy'),
        empId:this.employee};
    }
    else{
      json={startDate:this.datePipe.transform(this.fromDate,'dd/MM/yyyy'),
        endDate:this.datePipe.transform(this.toDate,'dd/MM/yyyy')};
    }
    this.apiService.postApiWithToken(this.cons.api.getAttendanceReport,json).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {
            this.response=result['object'];
            for(let i=0;i<this.response.length;i++){
              this.isTableVisible[i]=false;
            }
        debugger;
        }
        else {
          this.common.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        // this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });

  }

  downloadReport(month: any) {
    this.http.get(month.uploadPathUrl, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        //   this.http.get('https://icg.net.in/bmsreport/1681376372803.pdf', { responseType: 'blob' }).subscribe((blob: Blob) => {
        this.SpinnerService.hide();
        FileSaver.saveAs(blob, month.fileName);
      },
      (error) => {
        this.SpinnerService.hide();
        console.error('Failed to download PDF:', error);
      }
    );
  }

  toggleTable(i: number) {
    this.isTableVisible[i]=!this.isTableVisible[i];
      }
}
