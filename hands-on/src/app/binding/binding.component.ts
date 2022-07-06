import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {
  names = ["Yash Kavaiya", "Smit Soani", "Ankit Shah"];
  index:number = 0;

  myName:string = "";
  msg:string = "Hello World!";

  constructor() {
    this.myName = this.names[this.index];
  }

  ngOnInit(): void {
  }

  changeName() : void {
    this.index = (this.index + 1) % this.names.length;
    this.myName = this.names[this.index];
  }
}
