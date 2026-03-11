import { createActionGroup, props } from '@ngrx/store';
import { Identifiable } from '../../components/table/identifiable';

export const InformationActions = createActionGroup({
  source: 'Information',
  events: {
    'Load Information': props<{ makeId: number }>(),
    'Load Information Success': props<{
      makeId: number;
      types: Identifiable[];
      models: Identifiable[];
    }>(),
    'Load Information Failure': props<{ error: string }>(),
  },
});
