import { createReducer, on } from '@ngrx/store';
import { initialState } from '../state/makes.state';
import { MakesActions } from '../actions/makes.actions';

export const makesReducer = createReducer(
  initialState,
  on(MakesActions.loadMakes, (state) => ({ ...state, loading: true })),
  on(MakesActions.loadMakesSuccess, (state, { makes }) => ({
    ...state,
    items: makes,
    loading: false,
  })),
);
