import { Component, HostBinding, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { LoginAuthService } from 'src/app/_services/login-auth.service';
import { PopUpModalService, ModalService, MsiModalRef, PopUpModalData } from '@msi/cobalt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/_model/student';
import { Router } from '@angular/router';
import { CRUDService } from 'src/app/_services/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('confirmationModalTemplate', {static: true}) confirmationModalTemplate!: TemplateRef<any>;

  private confirmationModal!: MsiModalRef;
  private closingModal!: PopUpModalData;

  @HostBinding('style.width') width = '100%';
  // data: {id: string, name: string, address: string, city: string, contact: string}[];
  data: Student[];

  newItemForm: FormGroup;

  customSort = (a: string, b: string): number => {
    return a.localeCompare(b);
  }

  constructor(private authService: LoginAuthService, private crud: CRUDService,
    private popUpModalService: PopUpModalService, private modalService: ModalService,
    private formBuilder: FormBuilder) {
    this.data = this.crud.getAll()
    this.newItemForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      address: [''],
      contact: ['', Validators.required],
      city: ['']
    })
  }

  ngOnInit(): void {
  }

  deleteAll() {
    this.crud.deleteAll();
    this.data = [];
  }

  openNarrativeEditor(tpl: TemplateRef<any>) {
    if (!this.popUpModalService.getOpenedModals().filter((modal) => modal['type'] === 'narrative').length) {
      const modal = this.popUpModalService.open(tpl, {size: 'large', type: 'narrative', maxWidth: 600, maxHeight: 700});
      modal['title'] = 'New Item';
    }
  }

  confirmBeforeClosing(modalData: PopUpModalData) {
    this.closingModal = modalData;
    this.confirmationModal = this.modalService.open(this.confirmationModalTemplate, {
      disableClose: true,
      hasBackdrop: true,
    });
  }

  confirmationModalOnCancel() {
    this.confirmationModal.close();
  }

  confirmationModalOnConfirm() {
    this.popUpModalService.close(this.closingModal);
    this.newItemForm.reset();
    this.confirmationModal.close();
  }

  submit() {
    this.newItemForm.updateValueAndValidity();

    if(this.newItemForm.invalid) {
      return;
    }
    else {
      const newData = this.newItemForm.controls;
      const index = this.getIndexOfElement(newData['id'].value);
      if(index == -1) {
        // Insert
        this.crud.add(new Student(
          newData['name'].value,
          newData['address'].value,
          newData['city'].value,
          newData['contact'].value
        ))
        this.data = this.crud.getAll()
      }
      else {
        // Update
        this.data[index].set(
            newData['id'].value,
            newData['name'].value,
            newData['address'].value,
            newData['city'].value,
            newData['contact'].value
        );
        this.crud.update(this.data[index])
      }
      this.newItemForm.reset();
      this.popUpModalService.getOpenedModals().filter((modal) => modal.close());
    }
  }

  editItem(id: string, tpl: TemplateRef<any>) {
    if (!this.popUpModalService.getOpenedModals().filter((modal) => modal['type'] === 'narrative').length) {
      const index = this.getIndexOfElement(id);
      const noteToBeEdited = this.data[index];

      this.newItemForm.controls['id'].setValue(noteToBeEdited.id);
      this.newItemForm.controls['name'].setValue(noteToBeEdited.name);
      this.newItemForm.controls['address'].setValue(noteToBeEdited.address);
      this.newItemForm.controls['contact'].setValue(noteToBeEdited.contact);
      this.newItemForm.controls['city'].setValue(noteToBeEdited.city);

      const modal = this.popUpModalService.open(tpl, {size: 'large', type: 'narrative', maxWidth: 600, maxHeight: 700});
      modal['title'] = `Edit ID ${noteToBeEdited.id}`;
    }
  }

  deleteItem(id: string) {
    let i = this.getIndexOfElement(id);
    this.crud.delete(this.data[i])
    this.data.splice(i, 1);
  }

  saveDraft() {
    this.newItemForm.updateValueAndValidity();
    this.popUpModalService.getOpenedModals().filter((modal) => modal.toggleMinimized());
  }

  deleteDraft() {
    this.newItemForm.reset();
  }

  getIndexOfElement(id: string) {
    for(let i=0; i<this.data.length; i++) {
      if(this.data[i].id == id){
        return i;
      }
    }
    return -1;
  }
}
