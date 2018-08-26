import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WeatherServiceService } from './services/weather-service.service';
import {WikiServiceService} from './services/wiki-service.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';
import {DatePipe} from '@angular/common';
import { AlertModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TripPlannerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot(),
  ],
  providers: [WeatherServiceService,WikiServiceService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
