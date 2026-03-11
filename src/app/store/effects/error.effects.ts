import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { MakesActions } from '../actions/makes.actions';
import { InformationActions } from '../actions/information.actions';

export const displayError$ = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(MakesActions.loadMakesFailure, InformationActions.loadInformationFailure),
      tap(({ error }) => {
        snackBar.open(error || 'An unexpected error occurred', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });
      }),
    );
  },
  { functional: true, dispatch: false },
);
