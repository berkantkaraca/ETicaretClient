import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any; // jQuery

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    const img = renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/delete.png');
    img.setAttribute('style', 'cursor:pointer;');
    img.width = 25;
    img.height = 25;
    renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string; //silinecek nesnenin id'sini yakalar
  @Output() callback: EventEmitter<any> = new EventEmitter(); //silme işlemi sonrası listeyi yenilemek için kullanılır

  @HostListener('click')
  async onClick() {
    this.spinner.show(SpinnerType.BallAtom);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(2000, () => {
      this.callback.emit();
    });
  }
}
