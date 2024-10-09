import { describe, it, expect } from 'vitest';
import { deleteNodeById } from './treeOperations';
import { Node } from '../types/node';

describe('deleteNodeById', () => {
  it('should delete a node by id', () => {
    const tree: Node[] = [
      { uniqueId: '1', label: 'Label 1', children: [] },
      { uniqueId: '2', label: 'Label 2', children: [] }
    ];
    const result = deleteNodeById(tree, '1');
    expect(result).toBe(true);
    expect(tree).toHaveLength(1);
    expect(tree[0].uniqueId).toBe('2');
  });

  it('should delete a node by id in a nested tree', () => {
    const tree: Node[] = [
      { uniqueId: '1', label: 'Label 1', children: [
        { uniqueId: '1.1', label: 'Label 1.1', children: [] },
        { uniqueId: '1.2', label: 'Label 1.2', children: [] }
      ]},
      { uniqueId: '2', label: 'Label 2', children: [] }
    ];
    const result = deleteNodeById(tree, '1.1');
    expect(result).toBe(true);
    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children?.[0].uniqueId).toBe('1.2');
  });

  it('should return false if the node is not found', () => {
    const tree: Node[] = [
      { uniqueId: '1', label: 'Label 1', children: [] },
      { uniqueId: '2', label: 'Label 2', children: [] }
    ];
    const result = deleteNodeById(tree, '3');
    expect(result).toBe(false);
    expect(tree).toHaveLength(2);
  });

  it('should delete a node with children', () => {
    const tree: Node[] = [
      { uniqueId: '1', label: 'Label 1', children: [
        { uniqueId: '1.1', label: 'Label 1.1', children: [] },
        { uniqueId: '1.2', label: 'Label 1.2', children: [] }
      ]},
      { uniqueId: '2', label: 'Label 2', children: [] }
    ];
    const result = deleteNodeById(tree, '1');
    expect(result).toBe(true);
    expect(tree).toHaveLength(1);
    expect(tree[0].uniqueId).toBe('2');
  });
});