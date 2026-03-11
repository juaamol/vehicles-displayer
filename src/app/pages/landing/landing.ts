import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { form, FormField, debounce } from '@angular/forms/signals';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { Table } from '../../components/table/table';
import { MakesActions } from '../../store/actions/makes.actions';
import { selectAllMakes } from '../../store/selectors/makes.selectors';

interface SearchMake {
  query: string;
  byName: boolean;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [MatFormFieldModule, MatInput, MatSelect, MatOption, Table, FormField],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly searchModel = signal<SearchMake>({
    query: this.route.snapshot.queryParamMap.get('query') || '',
    byName: this.route.snapshot.queryParamMap.get('byName') !== 'false',
  });

  protected readonly searchForm = form(this.searchModel, (form) => {
    debounce(form.query, 250);
  });

  filteredMakes = computed(() => {
    const makes = this.store.selectSignal(selectAllMakes)();
    const searchTerm = this.searchForm.query().value().toLowerCase().trim();
    const isByName = this.searchForm.byName().value();

    if (!searchTerm) return makes;

    return makes.filter((make) =>
      isByName
        ? make.name.toLowerCase().includes(searchTerm)
        : make.id.toString().includes(searchTerm),
    );
  });

  constructor() {
    effect(() => {
      const query = this.searchForm.query().value();
      const isByName = this.searchForm.byName().value();
      this.updateUrl(query, isByName);
    });
  }

  ngOnInit() {
    this.store.dispatch(MakesActions.loadMakes());
  }

  goTo(id: number) {
    this.router.navigate([`/information/${id}`]);
  }

  private updateUrl(query: string, isByName: boolean) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { query, byName: isByName },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
}
