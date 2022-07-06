import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  numbers: number[] = [];
  value: { systemId: string }| { countryCode: string };
  childValue: string = "";

  constructor() {
    this.value = {systemId:""};
   }

  ngOnInit(): void {
  }

  generate(value:string): void {
    this.numbers.splice(0, this.numbers.length);

    for(let i=1; i <= Number(value); i++) {
      this.numbers.push(i);
    }
  }

  processRadio($event: { systemId: string; } | { countryCode: string; }) {
    this.value = $event;
  }
}
