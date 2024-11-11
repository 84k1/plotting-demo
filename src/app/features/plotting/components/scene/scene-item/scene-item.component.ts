import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  NgZone,
  output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Scene } from '../../../../../models/chapter.types';
import { IconButtonComponent } from '../../../../../shared/components/icon-button/icon-button.component';
@Component({
  selector: 'app-scene-item',
  standalone: true,
  imports: [ReactiveFormsModule, IconButtonComponent],
  templateUrl: './scene-item.component.html',
  styleUrl: './scene-item.component.scss',
})
export class SceneItemComponent {
  zone = inject(NgZone);
  destroyRef = inject(DestroyRef);

  scene = input.required<Scene | null>();
  onDelete = output<Scene>();

  @ViewChild('sceneInput') inputScene?: ElementRef<HTMLInputElement>;

  sceneCtrl = new FormControl<string | null>(null, [Validators.required]);
  editableMode = false;

  editScene() {
    if (!this.scene()) return;
    this.editableMode = true;
    this.sceneCtrl.setValue(this.scene()!.name);

    // !Workaround solution
    // TODO refactor this with QueryList approach
    this.zone.onMicrotaskEmpty
      .asObservable()
      .pipe(take(1))
      .subscribe(() => this.inputScene?.nativeElement.focus());
  }

  saveChanges() {
    if (!this.scene() || !this.sceneCtrl.value) {
      this.editableMode = false;
      return;
    }
    this.scene()!.name = this.sceneCtrl.value;

    this.editableMode = false;
  }
}
