import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import {WeatherServiceService} from '../services/weather-service.service';
import {WikiServiceService} from '../services/wiki-service.service';
import { Subscription } from 'rxjs';
import {WikiModel} from '../model/wiki-model';
import {WeatherModel,ListModel} from '../model/weather-model';
import { DatePipe } from '@angular/common';
import {ForecastModel} from '../model/forcast-model';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})
export class TripPlannerComponent implements OnInit,OnDestroy {

  subWeather: Subscription;
  subWiki: Subscription;
  wiki:WikiModel;
  weatherObj: WeatherModel;
  forecastList:ForecastModel[];

  cities:{id: number, name: string}[]=[
    { id: 5946768, name: 'Edmonton'},
    { id: 112931, name: 'Tehran'},
    { id: 2643741, name: 'London'},
    { id: 5814616, name: 'Vancouver'},
    { id: 6167865, name: 'Toronto'},
];

  constructor(private weatherServiceService:WeatherServiceService,
              private wikiServiceService:WikiServiceService,
              private datePipe: DatePipe) { 
  }

  ngOnInit() {
    this.showInfo(this.cities[0].name);
  }

  showInfo(name:string){

    if (name!=undefined){
      const city= this.cities.find(c=> c.name === name);

         this.subWeather=this.weatherServiceService.get(city.id).subscribe(
          (res:WeatherModel)=>{
            this.weatherObj= res;
            this.addToForecastList(this.weatherObj.list);
          },
        (err)=>{
          alert('Something went wrong'+err);
      });

      if (name!== undefined){
             this.subWiki=this.wikiServiceService.get(name).subscribe((res:WikiModel)=>{
            this.wiki= res;
          },
          (err)=>{
          alert('Something went wrong'+err);
        });
  }
  } else{
    alert('There is a problem, please try again.');
  }
  }

  
  addToForecastList(list: ListModel[]){
    this.forecastList=[];
    const today = new Date();
    
    if (today.getHours()<15){
      for (let i=0;i<list.length-1;i += 8){
        const dt= new Date(list[i].dt_txt).toString();
        const icon='http://openweathermap.org/img/w/'+list[i].weather[0].icon+'.png';
        this.forecastList.push({date: dt ,temp: list[i].main.temp, sky: list[i].weather[0].description, type:list[i].weather[0].main, img: icon});
      }
    } else{
      for (let i=0;i<list.length-1;i += 8){
        const dt= new Date(list[i].dt_txt);
        let t = new Date(dt.setDate(dt.getDate() - 1)).toString();
        const icon='http://openweathermap.org/img/w/'+list[i].weather[0].icon+'.png';
        this.forecastList.push({date: t ,temp: list[i].main.temp, sky: list[i].weather[0].description, type:list[i].weather[0].main, img:icon});
      }
    }
    console.log(this.forecastList,'list');

  }

  ngOnDestroy(){
   if (this.subWeather){
     this.subWeather.unsubscribe();
   }
   if (this.subWiki){
     this.subWiki.unsubscribe();
   }
  }

}
