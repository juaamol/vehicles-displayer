import { Identifiable } from '../../components/table/identifiable';
import { Make } from '../../services/vehicles-service/models/make';

export interface MakesState {
  vehicleTypes: Record<number, Identifiable[]>;
  vehicleModels: Record<number, Identifiable[]>;
  items: Make[];
  loading: boolean;
}

export const initialState: MakesState = {
  vehicleTypes: {},
  vehicleModels: {},
  items: [],
  loading: false,
};
