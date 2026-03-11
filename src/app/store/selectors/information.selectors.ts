import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MakesState } from '../state/makes.state';

export const selectMakesState = createFeatureSelector<MakesState>('makes');

export const selectAllMakes = createSelector(selectMakesState, (s) => s.items);

export const selectInformationByMakeId = (makeId: number) =>
  createSelector(selectMakesState, (state) => ({
    types: state.vehicleTypes[makeId] ?? [],
    models: state.vehicleModels[makeId] ?? [],
  }));
