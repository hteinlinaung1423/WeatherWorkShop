import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { WeatherData } from '../components/weather.component';

//Only required if your service is injecting other services
@Injectable()
export class WeatherService {

  private static APPID = "4fb6d1a6ad4e43d074d554eee7717253";

  onWeather = new Subject<WeatherData[]>();

  //Inject Http service into WeatherService, must be anootated with @Injectable()
  constructor(private http: Http) { }

  public getWeather(city: string): Promise<WeatherData[]> {
    const p = new Promise<WeatherData[]>((resolve, reject) => {
      this.http.get("http://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: city,
          appid: WeatherService.APPID
        }
      }).subscribe(
        (result) => {
          const weatherData = result.json().weather;
          resolve(weatherData);
          this.onWeather.next(weatherData);
        },
        (error) => { reject(error); }
      );
    });

    return (p);
  }

}
