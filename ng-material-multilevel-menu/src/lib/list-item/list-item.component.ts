import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, state, group } from '@angular/animations';

import { Configuration } from './../configuration.model';
import { MultilevelNodes } from './../multilevel-nodes.model';
import { NavigationNodesEmitter } from './../navigation-nodes-emitter.model';
import { CONSTANT } from '../constants';

@Component({
  selector: 'ng-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({ height: '*', opacity: 0 })),
      transition(':leave', [
        style({ height: '*', opacity: 1 }),
        group([
          animate(300, style({ height: 0 })),
          animate('200ms ease-in-out', style({ 'opacity': '0' }))
        ])
      ]),
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        group([
          animate(300, style({ height: '*' })),
          animate('400ms ease-in-out', style({ 'opacity': '1' }))
        ])
      ])
    ]),
    trigger('isExpanded', [
      state('no', style({ transform: 'rotate(-90deg)' })),
      state('yes', style({ transform: 'rotate(0deg)', })),

      transition('no => yes',
        animate(300)
      ),
      transition('yes => no',
        animate(300)
      )
    ])
  ]
})
export class ListItemComponent implements OnChanges {
  @Input() node: MultilevelNodes;
  @Input() selectedNode: MultilevelNodes;
  @Input() isSelected: boolean;
  @Input() nodeConfiguration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  nodeChildren: MultilevelNodes[];
  ngOnChanges() {
    this.nodeChildren = this.node && this.node.items ? this.node.items.filter(n => !n.hidden) : [];
    if (this.node !== undefined && this.selectedNode !== undefined) {
      const compareWith = this.node.items ? this.node.items : [];
      const ix = compareWith.indexOf(this.selectedNode);
      this.isSelected = ix !== -1;
    } else {
      this.isSelected = false;
    }
  }

  getPaddingAtStart() {
    return this.nodeConfiguration.paddingAtStart ? true : false;
  }
  getListStyle() {
    const styles = {};
    if (this.nodeConfiguration.listBackgroundColor !== null) {
      styles[`background`] = this.nodeConfiguration.listBackgroundColor;
    }
    if (this.isSelected) {
      styles[`color`] = CONSTANT.DEFAULT_SELECTED_COLOR;
    } else if (this.nodeConfiguration.fontColor !== null) {
      styles[`color`] = this.nodeConfiguration.fontColor;
    }
    return styles;
  }
  hasItems() {
    return this.nodeChildren.length > 0 ? true : false;
  }
  expand(node: MultilevelNodes) {
    node.expanded = !node.expanded;
    if (node.items === undefined) {
      delete node.expanded;
      node.finalNode = true;
    } else {
      node.finalNode = false;
    }
    this.selectedListItem(node);
  }
  selectedListItem(event) {
    this.selectedItem.emit(event);
  }
}
