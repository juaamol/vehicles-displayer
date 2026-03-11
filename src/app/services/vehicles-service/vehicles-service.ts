import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_URL } from '../../environment/env';
import { VehicleTypeDto } from './dtos/vehicle-type.dto';
import { Make } from './models/make';
import { Identifiable } from '../../components/table/identifiable';
import { VehicleModelDto } from './dtos/vehicle-model.dto';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private http = inject(HttpClient);

  getAllMakes(): Observable<Make[]> {
    return this.http
      .get<{ Results: MakeDto[] }>(`${API_URL}/vehicles/GetAllMakes?format=json`)
      .pipe(
        map((response) =>
          response.Results.map((dto: MakeDto): Make => ({ id: dto.Make_ID, name: dto.Make_Name })),
        ),
      );
  }

  getVehicleTypesByMakeId(makeId: number) {
    return this.http
      .get<{
        Results: VehicleTypeDto[];
      }>(`${API_URL}/vehicles/GetVehicleTypesForMakeId/${makeId}?format=json`)
      .pipe(
        map((response) =>
          response.Results.map(
            (dto: VehicleTypeDto): Identifiable => ({
              id: dto.VehicleTypeId,
              name: dto.VehicleTypeName,
            }),
          ),
        ),
      );
  }

  getVehicleModelsByMakeId(makeId: number) {
    return this.http
      .get<{
        Results: VehicleModelDto[];
      }>(`${API_URL}/vehicles/GetModelsForMakeId/${makeId}?format=json`)
      .pipe(
        map((response) =>
          response.Results.map(
            (dto: VehicleModelDto): Identifiable => ({
              id: dto.Model_ID,
              name: dto.Model_Name,
            }),
          ),
        ),
      );
  }
}
