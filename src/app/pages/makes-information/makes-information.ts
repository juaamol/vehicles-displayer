import { Component, inject, OnInit } from '@angular/core';
import { Table } from '../../components/table/table';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { InformationActions } from '../../store/actions/information.actions';
import { selectInformationByMakeId } from '../../store/selectors/information.selectors';

@Component({
  selector: 'app-makes-information',
  imports: [Table],
  templateUrl: './makes-information.html',
  styleUrl: './makes-information.scss',
})
export class MakesInformation implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  makeId = Number(this.route.snapshot.paramMap.get('id'));
  information = this.store.selectSignal(selectInformationByMakeId(this.makeId));

  ngOnInit() {
    if (this.information().types.length === 0) {
      this.store.dispatch(InformationActions.loadInformation({ makeId: this.makeId }));
    }
  }
}
