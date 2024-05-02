import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreateWithYamlService {

  constructor(private http: HttpClient) { }

  addResource(yamlContent: string) {
    const apiUrl = 'http://localhost:8080/api/create/resource'; 
    return this.http.post(apiUrl, { yamlContent });
  }
}
