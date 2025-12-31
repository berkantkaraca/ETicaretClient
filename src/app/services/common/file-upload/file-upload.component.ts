import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService,
    private spinner: NgxSpinnerService
  ) { }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    //Upload edilecek dosyaları tutar
    const fileData: FormData = new FormData();

    //Dosyaları FormData'ya ekleme
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    //Gönderme operasyonu
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {

          const message: string = "Dosyalar başarıyla yüklenmiştir.";

           if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              })
           } else {
            this.customToastrService.message(message, "Başarılı.", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight
            })
           }

     }, (errorResponse: HttpErrorResponse) => {

          const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";

          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              })
          } else {
            this.customToastrService.message(message, "Başarsız.", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            })
          }
  }
}

//Client'ın dosya yükleme işlemlerinde kullanacağı opsiyonları belirten sınıf
export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string; //kullanıcıya gösterilecek açıklama
  accept?: string; //pdf, docx, png gibi uzantılar için
  isAdminPage?: boolean = false;
}
