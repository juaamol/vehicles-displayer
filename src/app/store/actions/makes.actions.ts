import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MakesActions = createActionGroup({
  source: 'Makes API',
  events: {
    'Load Makes': emptyProps(),
    'Load Makes Success': props<{ makes: Make[] }>(),
    'Load Makes Failure': props<{ error: string }>(),
  },
});
