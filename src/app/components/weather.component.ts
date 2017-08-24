import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

import { WeatherService } from '../services/weather.service';

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  private static APPID = '4fb6d1a6ad4e43d074d554eee7717253';

  @ViewChild('weatherForm') weatherForm: NgForm;

  weatherOfCities = [];

  cityName: string;

  vis: string = 'hidden';

  private weatherSubscription: Subscription;

  constructor(private http: Http, private weather: WeatherService) { }

  ngOnInit() {
    this.weatherSubscription = this.weather.onWeather.subscribe(
      (data: WeatherData[]) => {
        console.log('from observable: ', data);
      }
    );
  }

  ngOnDestroy() {
    this.weatherSubscription.unsubscribe();
  }

  getWeather() {

     this.cityName = this.weatherForm.value.cityName;

    const promise = this.weather.getWeather(this.cityName);
      promise.then((result: WeatherData[]) => {
          this.weatherOfCities = result;
          this.vis = 'visible';
        });
        promise.catch((error) => {
          console.error('error: ', error);
        });
  }

}
