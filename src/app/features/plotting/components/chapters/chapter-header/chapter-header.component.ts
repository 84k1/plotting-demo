import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Component, input, Input } from '@angular/core';
import { ChapterItem, MatrixItem } from '../../../../../models/chapter.types';
import { newGuid, printMat } from '../../../utils/test-data.util';
import { ChapterItemComponent } from '../chapter-item/chapter-item.component';

@Component({
  selector: 'app-chapter-header',
  standalone: true,
  imports: [ChapterItemComponent, CdkDropList, CdkDrag],
  templateUrl: './chapter-header.component.html',
  styleUrl: './chapter-header.component.scss',
})
export class ChapterHeaderComponent {
  @Input({ required: true })
  chapters!: ChapterItem[];

  mat = input.required<MatrixItem[][]>();

  drop(event: CdkDragDrop<ChapterItem[]>, chapter?: ChapterItem) {
    moveItemInArray(this.chapters, event.previousIndex, event.currentIndex);

    let oldColIndx = event.previousIndex;
    let newColIndx = event.currentIndex;

    if (
      this.mat().length === 0 ||
      oldColIndx === newColIndx ||
      oldColIndx < 0 ||
      oldColIndx >= this.mat()[0].length ||
      newColIndx < 0 ||
      newColIndx >= this.mat()[0].length ||
      oldColIndx === newColIndx
    ) {
      return;
    }

    for (let i = 0; i < this.mat().length; i++) {
      // Remove the element at the `oldColIndx` index
      let row = this.mat()[i];
      const [movedColumn] = row.splice(oldColIndx, 1);

      // Insert the removed element at the `newColIndx` index
      row.splice(newColIndx, 0, movedColumn);

      // update internal i and j indexes
      for (let j = 0; j < row.length; j++) {
        let e = this.mat()[i][j];
        e.i = i;
        e.j = j;
      }
    }
  }

  addNewChapter() {
    // add new chapter
    this.chapters.push({
      id: newGuid(),
      i: this.chapters.length,
      name: `New chapter ${this.chapters.length}`,
    });

    // extend matrix for one more column
    let i = 0;
    for (let row of this.mat()) {
      row.push({
        i,
        j: this.mat().length,
        scenes: [],
        id: newGuid(),
      }); // Add the new column with the specified value at the end of each row
      i++;
    }
  }

  handleDeleteChapter(chapter: ChapterItem) {
    let colIndx = this.chapters.findIndex((e) => e.id == chapter.id);

    if(colIndx < 0) return;

    this.chapters.splice(colIndx, 1);

    if (this.mat().length === 0 || colIndx < 0) return;

    for (let row of this.mat()) {
      let i = 0;
      if (colIndx <= row.length) {
        row.splice(colIndx, 1); // Remove the i-th element from each row
      }

      for (let j = 0; j < row.length; j++) {
        row[j].i = i;
        row[j].j = j;
      }
      i++;
    }
  }
}
