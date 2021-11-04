import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestDto } from '../models/RequestDto';

@Injectable({
  providedIn: 'root',
})

export class REQUESTSERVICE {
  constructor(private general: GeneralService) {}

  getAllRequest() {
    return this.general.getData<RequestDto[]>(
      `${environment.api}/external/obtenerRequest`
    );
  }
}
