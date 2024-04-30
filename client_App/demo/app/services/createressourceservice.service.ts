import { environment } from 'demo/environments/environment'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CreateResourceService {
  constructor(private http: HttpClient) {}
 
  postJsonData(data: any, namespace: string): Observable<any> {
    const apiUrl = `${environment.KubernetesApiUrl}/api/v1/namespaces/${namespace}/pods`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
 
    return this.http.post<any>(apiUrl, data, { headers });
  }
}