import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../_model/student';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  link = 'http://localhost:5000/api'

  constructor(private http: HttpClient) { }

  getAll() {
    let dataArray: Student[] = [];

    this.http.get<any>(`${this.link}/getAll`).subscribe(
      res => {
        let data = res["data"]
        console.log(data)

        for(let i=0; i < data.length; i++) {
          console.log(data[i])
          let std = new Student(
            data[i]["name"],
            data[i]["address"],
            data[i]["city"],
            data[i]["contact"]
          )
          std.setID(data[i]["id"])
          dataArray.push(std);
        }
      }
    )
    return dataArray
  }

  add(student: Student) {
    this.http.post<any>(`${this.link}/add`, {"name": student.name, "address": student.address, "city": student.city, "contact": student.contact}).subscribe(
      res => {
        console.log(res["message"])
      }
    )
  }

  update(student: Student) {
    this.http.post<any>(`${this.link}/update`, {"id": student.id,"name": student.name, "address": student.address, "city": student.city, "contact": student.contact}).subscribe(
      res => {
        console.log(res["message"])
      }
    )
  }

  delete(student: Student) {
    this.http.post<any>(`${this.link}/delete`, {"id": student.id}).subscribe(
      res => {
        console.log(res["message"])
      }
    )
  }

  deleteAll() {
    this.http.post<any>(`${this.link}/deleteAll`, {}).subscribe(
      res => {
        console.log(res["message"])
      }
    )
  }
}
