import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {
  names = ["Yash Kavaiya", "Smit Sonani", "Bhautik Sudani", "Vraj Shah", "Veet Moradiya"];

  constructor() { }

  ngOnInit(): void {
  }

}
