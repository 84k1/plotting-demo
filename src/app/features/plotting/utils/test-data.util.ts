import { MatrixItem } from '../../../models/chapter.types';

export function getTestSceneData(): MatrixItem[][] {
  return [
    [
      {
        id: newGuid(),
        scenes: [
          { name: 's00.0', id: newGuid() },
          { name: 's00.1', id: newGuid() },
        ],
        i: 0,
        j: 0,
      },
      { id: newGuid(), scenes: [{ name: 's01', id: newGuid() }], i: 0, j: 1 },
      {
        id: newGuid(),
        scenes: [
          { name: 's02.0', id: newGuid() },
          { name: 's02.1', id: newGuid() },
          { name: 's02.3', id: newGuid() },
        ],
        i: 0,
        j: 2,
      },
      { id: newGuid(), scenes: [{ name: 's03', id: newGuid() }], i: 0, j: 3 },
    ],
    [
      { id: newGuid(), scenes: [{ name: 's10', id: newGuid() }], i: 1, j: 0 },
      { id: newGuid(), scenes: [{ name: 's13', id: newGuid() }], i: 1, j: 3 },
    ],
    [
      { id: newGuid(), scenes: [{ name: 's21', id: newGuid() }], i: 2, j: 1 },
      { id: newGuid(), scenes: [{ name: 's22', id: newGuid() }], i: 2, j: 2 },
    ],
  ];
}

export function getTestChapterData() {
  return [
    { id: newGuid(), i: 0, name: 'Chap-0' },
    { id: newGuid(), i: 1, name: 'Chap-1' },
    { id: newGuid(), i: 2, name: 'Chap-2' },
    { id: newGuid(), i: 3, name: 'Chap-3' },
  ];
}

export function getPlotTestData() {
  return [
    { id: newGuid(), i: 0, name: 'Plot-0' },
    { id: newGuid(), i: 1, name: 'Plot-1' },
    { id: newGuid(), i: 2, name: 'Plot-2' },
    // { id: newGuid(), i: 3, name: 'Plot-3' },
  ];
}

export function printMat(mat: any) {
  console.table(JSON.parse(JSON.stringify(mat)));
}

export function newGuid(): string {
  return crypto.randomUUID();
}
