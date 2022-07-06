export class Student {
  id: string = '';
  name: string = '';
  address: string = '';
  contact: string = '';
  city: string = '';

  constructor(name: string, address: string, city: string, contact: string) {
    this.name = name;
    this.address = address;
    this.contact = contact;
    this.city = city;
  }

  set(id: string, name: string, address: string, city: string, contact: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.contact = contact;
    this.city = city;
  }

  setID(id: string) {
    this.id = id;
  }
}
