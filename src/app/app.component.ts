import { Component } from '@angular/core';
declare var $: any; // JQuery için global değişken bildirimi

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
}

$(document).ready(() => {
  alert("JQuery is working!");
});
