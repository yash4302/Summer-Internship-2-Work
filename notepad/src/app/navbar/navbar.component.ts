import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Output() sendToParent:EventEmitter<{id: string, title:string, note:string}>;
  @Output() clearAll:EventEmitter<number>;

  notesToSend!: {id: string, title:string, note:string};

  newNoteForm: FormGroup;
  formResetting: boolean = true;

  constructor(private formBuilder: FormBuilder) {
    this.sendToParent = new EventEmitter();
    this.clearAll = new EventEmitter();

    this.newNoteForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      note: ['']
    });
  }

  ngOnInit(): void {
  }

  addNote(): void {
    this.formResetting = false;
    this.newNoteForm.updateValueAndValidity();

    if(this.newNoteForm.invalid) {
      return;
    }
    else {
      // Do save
      this.formResetting = true;
      const newNote = {
        id: _.camelCase(this.newNoteForm.value.title),
        title: this.newNoteForm.value.title,
        note: this.newNoteForm.value.note
      };
      this.notesToSend = newNote;
      // Close modal
      let closeModal = document.getElementById('closeModal') as HTMLElement;
      closeModal.click();
      // Send to Parent
      this.sendToParent.emit(this.notesToSend);
      this.newNoteForm.reset();
    }
  }

  clearAllNotes() {
    this.clearAll.emit();
  }
}
