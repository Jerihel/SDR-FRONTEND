import { CriterionDto } from './../models/CriterionDto';
import { CriterionEvalution } from './../models/CriterioEvaluation';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CriterionEvalutionProjection } from '../models/CriterionEvalutionProjection';

@Injectable({
  providedIn: 'root',
})
export class CRITERIOSSERVICESService {
  //private ruta = "https://api.enactusumg.com/external/get/allCriterion"
  constructor(private general: GeneralService) {}

  getAllCriterio() {
    return this.general.getData<CriterionEvalutionProjection[]>(
      `${environment.api}/internal/get/allCriterion`
    );
  }

  updateCriterio(criterio: CriterionEvalution) {
    return  this.general.patchData<CriterionEvalution, CriterionEvalution>(`${environment.api}/internal/update/criterion`,undefined ,criterio)


  }

  addCriterio(criterio: CriterionDto) {
    return this.general.postData<CriterionEvalution, CriterionDto>( `${environment.api}/internal/create/criterion`,criterio)
      }
}
