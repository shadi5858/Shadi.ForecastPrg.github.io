import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WikiServiceService {

  private baseUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary';

  constructor(private http: HttpClient) { }

  get(name:string) {
    const url= this.baseUrl+'/'+name;
    return this.http.get(url)
    }
}
