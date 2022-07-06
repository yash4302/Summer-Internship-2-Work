import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'radio-type-input',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input()
  radioType?: string;

  @Output()
  radioDetailsSubmitted: EventEmitter<{systemId: string} | {countryCode: string}>;

  systemId: string = "";
  countryCode:string = "";

  constructor() {
    this.radioDetailsSubmitted = new EventEmitter();
  }

  ngOnInit(): void {
  }

  forSubmitted() {
    if(this.radioType == 'astro')
      this.radioDetailsSubmitted.emit({systemId: this.systemId});
    else
      this.radioDetailsSubmitted.emit({countryCode: this.countryCode});
  }

}
