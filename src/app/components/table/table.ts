import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [ScrollingModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  host: {
    role: 'table',
    'aria-label': 'Makes List',
  },
})
export class Table {
  makes = input<Make[]>([]);

  trackById(_: number, make: Make) {
    return make.id;
  }
}
