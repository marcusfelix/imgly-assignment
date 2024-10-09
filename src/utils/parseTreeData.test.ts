import { describe, it, expect } from 'vitest';
import parseTreeData from './parseTreeData';
import { Node } from '../types/node';

describe('parseTreeData', () => {
  it('should return a tree of nodes with uniqueId in every node', () => {
    const tree: Node[] = [
      { uniqueId: '1', label: 'Label 1', children: [
        { uniqueId: '1.1', label: 'Label 1.1', children: [] },
        { uniqueId: '1.2', label: 'Label 1.2', children: [] }
      ]},
      { uniqueId: '2', label: 'Label 2', children: [] }
    ];

    const result = parseTreeData(tree);

    const traverse = (nodes: Node[]): boolean => {
      for (const node of nodes) {
        if (!node.uniqueId) {
          return false;
        }
        if (node.children) {
          if (!traverse(node.children)) {
            return false;
          }
        }
      }
      return true;
    }

    expect(traverse(result)).toBeTruthy();
  });
});