import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input()
  index?:number;

  @Output() sendToParent:EventEmitter<string>;
  value: string = "";

  constructor() {
    this.sendToParent = new EventEmitter();
    this.value = "demo";
  }

  ngOnInit(): void {
    this.sendValueToParent();
  }

  sendValueToParent(): void {
    this.sendToParent.emit(this.value);
  }

}
