import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WeatherServiceService {

  constructor(private http: HttpClient) { 
  }
private baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=';
private apiKey= '7c7da62cd7733ff6a1e08f571a382bfa';

get(id:number) {
  const url= this.baseUrl+id+'&units=metric&&appid='+this.apiKey;
  return this.http.get(url)
  }
}
