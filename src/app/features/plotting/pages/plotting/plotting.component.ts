import { Component } from '@angular/core';

import { NgStyle } from '@angular/common';
import { ChapterItem, MatrixItem } from '../../../../models/chapter.types';
import { ChapterHeaderComponent } from '../../components/chapters/chapter-header/chapter-header.component';
import { PlotHeaderItemComponent } from '../../components/plot-header-item/plot-header-item.component';
import { SceneContainerComponent } from '../../components/scene/scene-container/scene-container.component';
import {
  getPlotTestData,
  getTestChapterData,
  getTestSceneData,
  newGuid,
  printMat,
} from '../../utils/test-data.util';

@Component({
  selector: 'app-plotting',
  standalone: true,
  imports: [
    NgStyle,
    ChapterHeaderComponent,
    PlotHeaderItemComponent,
    SceneContainerComponent,
  ],
  templateUrl: './plotting.component.html',
  styleUrl: './plotting.component.scss',
})
export class PlottingComponent {
  chapters: ChapterItem[] = getTestChapterData();
  plots: ChapterItem[] = getPlotTestData();

  mat: MatrixItem[][] = getTestSceneData();
  contentHeight: string = '0px';

  constructor() {
    this.fillMatrix();

    this.contentHeight = window.innerHeight - 50 + 'px';
  }

  addPlot() {
    printMat(this.mat);

    this.plots.push({
      id: newGuid(),
      i: this.plots.length,
      name: `Plot-${this.plots.length}`,
    });

    let newPlot: MatrixItem[] = [];
    for (let i = 0; i < this.chapters.length; i++) {
      // let i = this.chapters.length;

      newPlot.push({
        id: newGuid(),
        i: this.plots.length - 1,
        j: i,
        scenes: [],
      });
    }
    this.mat.push(newPlot);
    printMat(this.mat);
  }

  // TODO complexity O(N*logN)
  // TODO refactor this with web worker
  private fillMatrix() {
    // Step 1: Flatten the matrix into a single array of MatrixItem
    const flatArray: MatrixItem[] = this.mat.flat();

    // Step 2: Sort the flat array by `i` first, then by `j`
    flatArray.sort((a, b) => {
      if (a.i === b.i) {
        return a.j - b.j; // Sort by `j` if `i` values are the same
      }
      return a.i - b.i; // Sort by `i` first
    });

    // Step 3: Determine the maximum `j` index for the new matrix size
    const maxRows = Math.max(...flatArray.map((item) => item.i + 1)); // max `i` + 1
    const maxCols = Math.max(...flatArray.map((item) => item.j + 1)); // max `j` + 1

    // Step 4: Rebuild the sorted matrix structure
    this.mat = Array.from({ length: maxRows }, () => Array(maxCols).fill(null));

    flatArray.forEach((item) => {
      // Place each item in the correct row and column
      this.mat[item.i][item.j] = item;
    });

    // Fill in missing entries with { scenes: null, i, j }
    for (let i = 0; i < this.mat.length; i++) {
      for (let j = 0; j < maxCols; j++) {
        if (!this.mat[i][j]) {
          this.mat[i][j] = { scenes: [], i, j, id: newGuid() };
        }
      }
    }
  }
}
