import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { displayError$ } from './error.effects';
import { MakesActions } from '../actions/makes.actions';
import { vi, describe, it, expect, beforeEach } from 'vitest';

describe('ErrorEffects', () => {
  let actions$: Observable<any>;
  let snackBar: MatSnackBar;

  const mockSnackBar = {
    open: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    });

    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should open snackbar when loadMakesFailure is dispatched', () => {
    const errorMessage = 'API Error';
    actions$ = of(MakesActions.loadMakesFailure({ error: errorMessage }));

    TestBed.runInInjectionContext(() => {
      displayError$().subscribe();
    });

    expect(mockSnackBar.open).toHaveBeenCalledWith(errorMessage, 'Close', expect.any(Object));
  });
});
