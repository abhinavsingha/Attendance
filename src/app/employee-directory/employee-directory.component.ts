import {Component, OnInit, ViewChild} from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-employee-directory',
  templateUrl: './employee-directory.component.html',
  styleUrls: ['./employee-directory.component.scss']
})
export class EmployeeDirectoryComponent implements OnInit{
  @ViewChild('uploadFileInput') uploadFileInput: any;
  file: any;
  private progress: number=0;
  private docId: any;
  constructor(
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    public common: CommonService,
    private SpinnerService: NgxSpinnerService,
    private router: Router,
    private http: HttpClient) {}
  ngOnInit(): void {
    $.getScript('../../assets/js/app.js');
    $.getScript('../../assets/js/select2.min.js');
    $.getScript('../../assets/js/dropfiles.js')
    this.common.getAllDocumentType();
    this.getDocument();
  }
  uploadFile() {
    debugger;
    const formData = new FormData();
    const file: File = this.uploadFileInput.nativeElement.files[0];
    formData.append('file', file);
    this.apiService.postApiWithToken(this.cons.api.uploadFileTransactional, formData).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {
          this.docId=result['object'].uploadDocId;
          this.common.successAlert(
            'Success',
            result['response']['msg'],
            'success'
          );
          this.SpinnerService.hide();
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
          this.SpinnerService.hide();
        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => this.SpinnerService.hide(),
    });

  }
  filename:any;
  fileSize:any;
  selectedDocType: any;
  formdata = new FormGroup({
    docType: new FormControl(),

  });
  setFileNameSize() {
    this.filename=this.uploadFileInput.nativeElement.files[0].name;
    this.fileSize=this.uploadFileInput.nativeElement.files[0].size;
    if(Number(this.fileSize)>=1024&&Number(this.fileSize)<(1024*1024))
      this.fileSize=Number(Number(this.fileSize)/1024).toFixed(2)+' KB';
    else if(Number(this.fileSize)>=(1024*1024))
      this.fileSize=Number(Number(this.fileSize)/(1024*1024)).toFixed(2)+' MB';

  }

  saveDocument() {
    debugger;
    let json={
      uploadID:this.docId,
      masterDocId:this.formdata.get('docType')?.value.documentId
    }
    this.apiService.postApiWithToken(this.cons.api.uploadOfficialDocument, json).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {
          this.common.successAlert(
            'Success',
            result['response']['msg'],
            'success'
          );
          this.SpinnerService.hide();
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
          this.SpinnerService.hide();
        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => this.SpinnerService.hide(),
    });
  }
  getDocument() {
    debugger;

    this.apiService.getApiWithToken(this.cons.api.getAllUserDocument).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['httpStatus'] == 'CREATED') {
          debugger;
          this.common.successAlert(
            'Success',
            result['response']['msg'],
            'success'
          );
          this.SpinnerService.hide();
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
          this.SpinnerService.hide();
        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => this.SpinnerService.hide(),
    });
  }

}
