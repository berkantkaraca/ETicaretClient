import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) { }

  showSpinner(spinnerType: SpinnerType): void {
    this.spinner.show(spinnerType);

    setTimeout(() => this.hideSpinner(spinnerType), 1000);
  }

  hideSpinner(spinnerType: SpinnerType): void {
    this.spinner.hide(spinnerType);
  }
}

export enum SpinnerType {
  BallAtom = "s1",
  BallScaleMultiple = "s2",
  BallSpinClockwiseFadeRotating = "s3"
}
