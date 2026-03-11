export interface MakesState {
  items: Make[];
  loading: boolean;
}

export const initialState: MakesState = {
  items: [],
  loading: false,
};
