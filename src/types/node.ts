export interface Node {
  id?: string;
  uniqueId: string;
  label: string;
  children?: Node[];
}