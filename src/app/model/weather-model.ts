
export class WeatherModel{
    city:City;
    cnt:number;
    cod:string;
    message:number;
    list: ListModel[];
}

export class City{
    country:string;
    id:number;
    name:string;
}

export class ListModel {
    dt:number;
    dt_txt:string;
    main:Main;
    weather:Weather[];
    wind: Wind;
}

export class Main {
    humidity: number;
    grnd_level:number;
    pressure: number;
    temp: number;
    temp_max:number;
    temp_min: number;
}

export class Weather{
    id:number;
    description: string;
    icon: string;
    main:string;
}

export class Wind{
    deg:number;
    speed:number;
}
