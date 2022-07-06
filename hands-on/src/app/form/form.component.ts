import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  reactiveForm: FormGroup;
  formResetting: boolean = true;

  getForm() : { [key: string]: AbstractControl } {
    return this.reactiveForm.controls;
  }

  constructor(private formBuilder: FormBuilder) {
    // this.buildReactiveForm();
    this.reactiveForm = this.formBuilder.group({
      no: ['', Validators.required],
      name: ['', Validators.required, Validators.minLength(3)],
      phoneNo: ['', [Validators.pattern('/^[\+][0-9]\d*$/'), Validators.minLength(10), Validators.maxLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      isComments: [false],
      comments: ['']
    });
  }

  save(): void {
    this.formResetting = false;
    this.reactiveForm.updateValueAndValidity();

    if(this.reactiveForm.invalid) {
      return;
    }
    // Do save
    else {
      this.reactiveForm.reset();
    }
  }

  ngOnInit(): void {
  }
}
