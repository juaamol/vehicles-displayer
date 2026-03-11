import { Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { VehiclesService } from '../../services/vehicles-service/vehicles-service';
import { Store } from '@ngrx/store';
import { selectAllMakes } from '../../store/selectors/makes.selectors';
import { MakesActions } from '../../store/actions/makes.actions';
import { Table } from '../../components/table/table';

@Component({
  selector: 'app-landing',
  imports: [MatFormFieldModule, MatInput, MatSelect, MatOption, Table],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  private store = inject(Store);
  private vehiclesService = inject(VehiclesService);

  byName = input(true);
  makes = this.store.selectSignal(selectAllMakes);

  ngOnInit() {
    this.store.dispatch(MakesActions.loadMakes());
  }
}
