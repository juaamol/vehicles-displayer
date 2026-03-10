import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-landing',
  imports: [MatFormFieldModule, MatInput, MatSelect, MatOption],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {
  byName = input(true);
}
