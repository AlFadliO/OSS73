import { Component, Input } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { NamedColor } from 'src/app/shared/utils/css-named-color';

@Component({
  selector    : 'app-spinner',
  templateUrl : './spinner.component.html',
  styleUrls   : ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input()  diameter : number          = 100;               /** Diameter of the progress circle. */
  @Input()  strokeWidth : number       = 5;                 /** Stroke width of the progress spinner. */
  @Input()  mode : ProgressSpinnerMode = 'indeterminate';   /** Mode of the progress circle */
  @Input()  value : number             = 50;                /** Value of the progress circle. */
  @Input()  color : NamedColor         = NamedColor.brown;  /** Color of the progress circle. */
}
