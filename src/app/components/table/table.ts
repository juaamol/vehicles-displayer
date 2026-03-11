import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, input, output } from '@angular/core';
import { Identifiable } from './identifiable';

@Component({
  selector: 'app-table',
  imports: [ScrollingModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  host: {
    role: 'table',
    'aria-label': 'Items List',
  },
})
export class Table {
  items = input<Identifiable[]>([]);
  clicked = output<Identifiable>();

  trackById(_: number, make: Identifiable) {
    return make.id;
  }
}
