import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Configuration } from './configuration.model';
import { MultilevelNodes } from './multilevel-nodes.model';
import { NavigationNodesEmitter } from './navigation-nodes-emitter.model';
import { CONSTANT } from './constants';

@Component({
  selector: 'ng-material-multilevel-menu',
  templateUrl: './ng-material-multilevel-menu.component.html',
  styleUrls: ['./ng-material-multilevel-menu.component.css'],
})
export class NgMaterialMultilevelMenuComponent implements OnInit {
  @Input() nodes: MultilevelNodes[];
  @Input() configuration: Configuration = null;
  @Output() selectedItem = new EventEmitter<MultilevelNodes>();
  get filteredNodes() { return this.nodes ? this.nodes.filter(n => !n.hidden) : []; }
  isInvalidConfig = true;
  isSelected = 0;
  currentNode: MultilevelNodes;
  nodeConfig: Configuration = {
    paddingAtStart: true,
    listBackgroundColor: null,
    fontColor: null
  };
  constructor() { }
  ngOnInit() {
    this.checkValiddata();
    this.detectInvalidConfig();
  }
  checkValiddata() {
    if (this.filteredNodes.length === 0) {
      console.warn(CONSTANT.ERROR_MESSAGE);
    }
  }
  detectInvalidConfig(): void {
    if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
      this.isInvalidConfig = true;
    } else {
      this.isInvalidConfig = false;
      const config = this.configuration;
      if (config.paddingAtStart !== undefined && config.paddingAtStart !== null && typeof config.paddingAtStart === 'boolean') {
        this.nodeConfig.paddingAtStart = config.paddingAtStart;
      }
      if (config.listBackgroundColor !== '' &&
        config.listBackgroundColor !== null &&
        config.listBackgroundColor !== undefined) {
        this.nodeConfig.listBackgroundColor = config.listBackgroundColor;
      }
      if (config.fontColor !== '' &&
        config.fontColor !== null &&
        config.fontColor !== undefined) {
        this.nodeConfig.fontColor = config.fontColor;
      }
    }
  }
  getClassName() {
    if (this.isInvalidConfig) {
      return CONSTANT.DEFAULT_CLASS_NAME;
    } else {
      if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
        return `${CONSTANT.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
      } else {
        return CONSTANT.DEFAULT_CLASS_NAME;
      }
    }
  }
  getGlobalStyle() {
    if (!this.isInvalidConfig) {
      const styles = {};
      if (this.configuration.backgroundColor !== '' &&
        this.configuration.backgroundColor !== null &&
        this.configuration.backgroundColor !== undefined) {
        styles[`background`] = this.configuration.backgroundColor;
      }
      return styles;
    }
  }
  selectedListItem(event: MultilevelNodes) {
    this.currentNode = event;
    if (event.finalNode) {
      this.isSelected = 1;
      this.selectedItem.emit(event);
    }
  }
}
