import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherIconURL = 'https://openweathermap.org/img/w/';
  weatherAPI = 'https://api.openweathermap.org/data/2.5/weather?q=';
  weatherParams = '&units=metric&APPID=eb03b1f5e5afb5f4a4edb40c1ef2f534';

  cityName: string = "";
  result:any;
  weatherForm: FormGroup;
  formResetting: boolean = true;

  constructor(private http: Http, private formBuilder: FormBuilder) {
    this.weatherForm = this.formBuilder.group({
      city: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  sentenceCase(str: string) {
    return _.startCase(str);
  }

  getWeather() {
    this.formResetting = false;
    this.result = null;
    this.weatherForm.updateValueAndValidity();
    if(this.weatherForm.invalid) {
      return;
    }
    else {
      this.formResetting = true;
      this.cityName = this.weatherForm.value.city;
      const url = this.weatherAPI + this.cityName + this.weatherParams;
      console.log(url);
      this.http.get(url).subscribe(res => {
          this.result = res.json();
        }, error => {
          this.result = error.json();
        });
        // .subscribe(success, error, completed);
    }
  }
}
