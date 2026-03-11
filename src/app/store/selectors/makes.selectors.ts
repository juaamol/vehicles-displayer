import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MakesState } from '../state/makes.state';

export const selectMakesState = createFeatureSelector<MakesState>('makes');

export const selectAllMakes = createSelector(selectMakesState, (state) => state.items);
