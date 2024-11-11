export interface ChapterItem {
  id: string | null;
  i: number;
  name: string;
}

export interface MatrixItem {
  scenes: Scene[];
  id: string | null;
  i: number;
  j: number;
}

export interface Scene {
  id: string | null;
  name: string;
}
