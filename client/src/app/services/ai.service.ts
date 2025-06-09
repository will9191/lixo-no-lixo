import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoint } from '../constants/endpoints';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private httpClient: HttpClient) {}

  sendPrompt(message: string, image: string): Observable<any> {
    return this.httpClient.post<any>(`${apiEndpoint.AiEndpoint.chat}`, {
      message,
      image,
    });
  }
}
