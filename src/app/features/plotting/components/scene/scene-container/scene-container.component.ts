import { Component, computed, input } from '@angular/core';
import { MatrixItem, Scene } from '../../../../../models/chapter.types';
import { IconButtonComponent } from '../../../../../shared/components/icon-button/icon-button.component';
import { newGuid } from '../../../utils/test-data.util';
import { SceneItemComponent } from '../scene-item/scene-item.component';

@Component({
  selector: 'app-scene-container',
  standalone: true,
  imports: [SceneItemComponent, IconButtonComponent],
  templateUrl: './scene-container.component.html',
  styleUrl: './scene-container.component.scss',
})
export class SceneContainerComponent {
  matItem = input.required<MatrixItem>();
  
  scenes = computed(() => this.matItem().scenes);

  addScene() {
    let indx = !!this.scenes()?.length ? this.scenes()!.length + 1 : 0;

    let newScene: Scene = {
      name: `s${this.matItem().i}${this.matItem().j}.${indx || 0}`,
      id: newGuid(),
    };

    this.matItem().scenes!.push(newScene);
  }

  handleSceneDelete(scene: Scene) {
    let indx = this.scenes()?.findIndex((e) => e.id === scene.id);
    if (indx < 0) return;
    this.scenes().splice(indx, 1);
  }
}
