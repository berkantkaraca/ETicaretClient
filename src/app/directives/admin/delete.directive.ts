import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any; // jQuery

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
  ) {
    const img = renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 25;
    img.height = 25;
    renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string; //silinecek nesnenin id'sini yakalar
  @Input() controller: string; //silinecek nesnenin controller'ını yakalar
  @Output() callback: EventEmitter<any> = new EventEmitter(); //silme işlemi sonrası listeyi yenilemek için kullanılır

  @HostListener('click')
  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0,
          left: "+=50",
          height: "toggle"
        }, 700, () => {
          this.callback.emit();
          this.alertifyService.message("Kayıt silindi.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        });
      }, (errorResponse: HttpErrorResponse) =>{
        this.spinner.hide(SpinnerType.BallAtom);
        this.alertifyService.message("Kayıt silinemedi!", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '280px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
