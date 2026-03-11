import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { VehiclesService } from '../../services/vehicles-service/vehicles-service';
import { MakesActions } from '../actions/makes.actions';
import { selectAllMakes } from '../selectors/makes.selectors';

export const loadMakes$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store), service = inject(VehiclesService)) => {
    return actions$.pipe(
      ofType(MakesActions.loadMakes),
      withLatestFrom(store.select(selectAllMakes)),
      filter(([_, makes]) => makes.length === 0),
      switchMap(() =>
        service.getAllMakes().pipe(
          map((makes) => MakesActions.loadMakesSuccess({ makes })),
          catchError((error) => of(MakesActions.loadMakesFailure({ error: error.message }))),
        ),
      ),
    );
  },
  { functional: true },
);
