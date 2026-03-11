import { Component, inject, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { toSignal } from '@angular/core/rxjs-interop';
import { VehiclesService } from '../../services/vehicles-service/vehicles-service';
import { Store } from '@ngrx/store';
import { selectAllMakes } from '../../store/selectors/makes.selectors';
import { MakesActions } from '../../store/actions/makes.actions';

@Component({
  selector: 'app-landing',
  imports: [MatFormFieldModule, MatInput, MatSelect, MatOption, ScrollingModule],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  vehiclesService = inject(VehiclesService);
  byName = input(true);

  private store = inject(Store);

  makes = this.store.selectSignal(selectAllMakes);

  ngOnInit() {
    this.store.dispatch(MakesActions.loadMakes());
  }

  trackById(_: number, make: Make) {
    return make.id;
  }
}
