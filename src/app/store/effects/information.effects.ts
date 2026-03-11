import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, forkJoin, map, catchError, of } from 'rxjs';
import { VehiclesService } from '../../services/vehicles-service/vehicles-service';
import { InformationActions } from '../actions/information.actions';

export const loadInformation$ = createEffect(
  (actions$ = inject(Actions), service = inject(VehiclesService)) => {
    return actions$.pipe(
      ofType(InformationActions.loadInformation),
      switchMap(({ makeId }) =>
        forkJoin({
          types: service.getVehicleTypesByMakeId(makeId),
          models: service.getVehicleModelsByMakeId(makeId),
        }).pipe(
          map(({ types, models }) =>
            InformationActions.loadInformationSuccess({ makeId, types, models }),
          ),
          catchError((err) =>
            of(InformationActions.loadInformationFailure({ error: err.message })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
