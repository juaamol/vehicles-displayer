import { createReducer, on } from '@ngrx/store';
import { initialState } from '../state/makes.state';
import { MakesActions } from '../actions/makes.actions';
import { InformationActions } from '../actions/information.actions';

export const makesReducer = createReducer(
  initialState,

  on(MakesActions.loadMakes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(MakesActions.loadMakesSuccess, (state, { makes }) => ({
    ...state,
    items: makes,
    loading: false,
  })),

  on(MakesActions.loadMakesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(InformationActions.loadInformation, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(InformationActions.loadInformationSuccess, (state, { makeId, types, models }) => ({
    ...state,
    loading: false,
    vehicleTypes: {
      ...state.vehicleTypes,
      [makeId]: types,
    },
    vehicleModels: {
      ...state.vehicleModels,
      [makeId]: models,
    },
  })),

  on(InformationActions.loadInformationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
