import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { VehiclesService } from '../../services/vehicles-service/vehicles-service';
import { Store } from '@ngrx/store';
import { selectAllMakes } from '../../store/selectors/makes.selectors';
import { MakesActions } from '../../store/actions/makes.actions';
import { Table } from '../../components/table/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [MatFormFieldModule, MatInput, MatSelect, MatOption, Table],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  makes = this.store.selectSignal(selectAllMakes);
  query = signal(this.route.snapshot.queryParamMap.get('query') || '');
  byName = signal(this.route.snapshot.queryParamMap.get('byName') !== 'false');

  constructor() {
    effect(() => {
      const queryParams = {
        query: this.query(),
        byName: this.byName(),
      };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
    });
  }

  ngOnInit() {
    this.store.dispatch(MakesActions.loadMakes());
  }

  updateSearch(query: string) {
    this.query.set(query);
  }

  toggleSearchType(isByName: boolean) {
    this.byName.set(isByName);
  }
}
