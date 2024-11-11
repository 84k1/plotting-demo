import {
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ChapterItem, MatrixItem } from '../../../../models/chapter.types';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-plot-header-item',
  standalone: true,
  imports: [ReactiveFormsModule, IconButtonComponent],
  templateUrl: './plot-header-item.component.html',
  styleUrl: './plot-header-item.component.scss',
})
export class PlotHeaderItemComponent {
  zone = inject(NgZone);
  @ViewChild('plotInput') inputEl?: ElementRef<HTMLInputElement>;

  plot = input.required<ChapterItem>();
  plots = input.required<ChapterItem[]>();
  mat = input.required<MatrixItem[][]>();

  plotCtrl = new FormControl<string | null>(null, [Validators.required]);
  editableMode = false;

  removePlot() {
    const rowIndx = this.plot().i;
    this.plots().splice(rowIndx, 1);

    // Check if row index is within bounds
    if (rowIndx < 0 || rowIndx >= this.mat().length) return;

    // Remove the entire row at rowIndx
    this.mat().splice(rowIndx, 1);

    // Update indices of remaining cells
    for (let i = 0; i < this.mat().length; i++) {
      for (let j = 0; j < this.mat()[i].length; j++) {
        this.mat()[i][j].i = i; // Update row index
        this.mat()[i][j].j = j; // Update column index
      }
    }
  }

  editPlot() {
    if (!this.plot()) return;
    this.editableMode = true;
    this.plotCtrl.setValue(this.plot()!.name);

    // !Workaround solution
    // TODO refactor this with QueryList approach
    this.zone.onMicrotaskEmpty
      .asObservable()
      .pipe(take(1))
      .subscribe(() => this.inputEl?.nativeElement.focus());
  }

  saveChanges() {
    if (!this.plot() || !this.plotCtrl.value) {
      this.editableMode = false;
      return;
    }

    this.plot()!.name = this.plotCtrl.value;
    this.editableMode = false;
  }
}
