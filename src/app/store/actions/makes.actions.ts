import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Make } from '../../services/vehicles-service/models/make';

export const MakesActions = createActionGroup({
  source: 'Makes API',
  events: {
    'Load Makes': emptyProps(),
    'Load Makes Success': props<{ makes: Make[] }>(),
    'Load Makes Failure': props<{ error: string }>(),
  },
});
