import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  private http = inject(HttpClient);

  getAllMakes(): Observable<Make[]> {
    return this.http
      .get<{
        Results: MakeDto[];
      }>('https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json')
      .pipe(
        map((response) =>
          response.Results.map(
            (make: MakeDto): Make => ({ id: make.Make_ID, name: make.Make_Name }),
          ),
        ),
      );
  }
}
