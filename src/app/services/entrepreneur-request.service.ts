import { environment } from 'src/environments/environment';
import { GeneralService } from './general.service';
import { Injectable } from '@angular/core';
import { RequestEntrepreneurDto } from '../models/RequestEntrepreneurDto';

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurReqeustService {

  constructor(private general: GeneralService) { }

  createEntrepreneurRequest(request: RequestEntrepreneurDto) {
    return this.general.postData<Request, RequestEntrepreneurDto>(`${environment.api}/external/save/requestEntrepreneur`, request);
  }
}
