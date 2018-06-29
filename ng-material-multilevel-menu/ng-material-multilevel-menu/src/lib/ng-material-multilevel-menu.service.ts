import { Injectable, EventEmitter } from '@angular/core';

import { MultilevelNodes } from './multilevel-nodes.model';

@Injectable({
  providedIn: 'root'
})
export class NgMaterialMultilevelMenuService {
  constructor() { }
  isMatchFound = new EventEmitter<string>();

  generateId() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  addRandomId(nodes: MultilevelNodes[]) {
    nodes.forEach( (node: MultilevelNodes, index) => {
      node.id = this.generateId();
      if (node.items !== undefined) {
        this.addRandomId(node.items);
      }
    });
  }

  recursiveCheckId(node: MultilevelNodes, nodeId: string) {
    if (node.id === nodeId) {
      this.isMatchFound.emit(node.id);
    } else {
      if (node.items !== undefined ) {
        return node.items.forEach((nestedNode: MultilevelNodes) => {
          if (nestedNode.id === nodeId) {
            this.isMatchFound.emit(nestedNode.id);
          } else {
            this.recursiveCheckId(nestedNode, nodeId);
          }
        });
      }
    }
  }
}
