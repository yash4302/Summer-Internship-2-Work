import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() note!: {id: string, title:string, note:string};

  editNoteForm: FormGroup;
  formResetting: boolean = true;
  index: number = 0;
  noteToBeEdited !: {id: string, title:string, note:string};
  notes!: [{id: string, title:string, note:string}];

  constructor(private formBuilder2: FormBuilder) {
    this.editNoteForm = this.formBuilder2.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      note: ['']
    });
  }

  ngOnInit(): void {
  }

  editNoteNumber(index: number): void {
    this.index = index;
    this.noteToBeEdited = {id: this.notes[index].id, title:this.notes[index].title, note:this.notes[index].note};
    this.editNoteForm = this.formBuilder2.group({
      id: [this.noteToBeEdited.id, Validators.required],
      title: [this.noteToBeEdited.title, Validators.required],
      note: [this.noteToBeEdited.note]
    });
  }

  deleteNoteNumber(index: number): void {
    this.notes.splice(index, 1);
  }

  editNote(): void {
    this.formResetting = false;
    this.editNoteForm.updateValueAndValidity();

    if(this.editNoteForm.invalid) {
      return;
    }
    else {
      // Do save
      this.formResetting = true;
      const editedNote = {
        id: _.camelCase(this.editNoteForm.value.title),
        title: this.editNoteForm.value.title,
        note: this.editNoteForm.value.note
      };
      this.notes[this.index] = editedNote;
      // Close modal
      let closeModal = document.getElementById('closeModal2') as HTMLElement;
      closeModal.click();
    }
  }

  getNotes($event: {id: string, title:string, note:string}) {
    if(typeof this.notes == 'undefined'){
      this.notes = [{id: $event.id, title:$event.title, note:$event.note}];
    }
    else {
      this.notes.push($event);
    }
  }

  clearAll() {
    this.notes.splice(0, this.notes.length);
  }
}
