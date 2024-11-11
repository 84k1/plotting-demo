import {
  Component,
  ElementRef,
  inject,
  input,
  NgZone,
  output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ChapterItem } from '../../../../../models/chapter.types';
import { IconButtonComponent } from '../../../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'app-chapter-item',
  standalone: true,
  imports: [ReactiveFormsModule, IconButtonComponent],
  templateUrl: './chapter-item.component.html',
  styleUrl: './chapter-item.component.scss',
})
export class ChapterItemComponent {
  zone = inject(NgZone);

  @ViewChild('chapterInput') inputEl?: ElementRef<HTMLInputElement>;

  chapter = input.required<ChapterItem>();
  onDelete = output<ChapterItem>();

  chapterCtrl = new FormControl<string | null>(null, [Validators.required]);
  editableMode = false;

  editChapter() {
    if (!this.chapter()) return;
    this.editableMode = true;
    this.chapterCtrl.setValue(this.chapter()!.name);

    // !Workaround solution
    // TODO refactor this with QueryList approach
    this.zone.onMicrotaskEmpty
      .asObservable()
      .pipe(take(1))
      .subscribe(() => this.inputEl?.nativeElement.focus());
  }

  saveChanges() {
    if (!this.chapter() || !this.chapterCtrl.value) {
      this.editableMode = false;
      return;
    }

    this.chapter()!.name = this.chapterCtrl.value;
    this.editableMode = false;
  }
}
