import { Component, OnInit } from '@angular/core';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

@Component({
  selector: 'app-network-visualization',
  templateUrl: './network-visualization.component.html',
  styleUrls: ['./network-visualization.component.scss']
})
export class NetworkVisualizationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const nodes = new DataSet([
      { id: 1, label: 'Node 1', group: 'group1' },
      { id: 2, label: 'Node 2', group: 'group1' },
      { id: 3, label: 'Node 3', group: 'group1' },
      { id: 4, label: 'Node 4', group: 'group2' },
      { id: 5, label: 'Node 5', group: 'group2' },
      { id: 6, label: 'Node 6', group: 'group2' },
      { id: 7, label: 'Node 7', group: 'group3' },
      { id: 8, label: 'Node 8', group: 'group3' },
      { id: 9, label: 'Node 9', group: 'group3' }
    ]);

    const edges = new DataSet<any>([
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 4, to: 5 },
      { from: 5, to: 6 },
      { from: 7, to: 8 },
      { from: 8, to: 9 }
    ]);

    const container = document.getElementById('network');
    const data = { nodes: nodes, edges: edges };
    const options = {
      groups: {
        group1: { color: { background: 'red' }, borderWidth: 2, shape: 'box' },
        group2: { color: { background: 'blue' }, borderWidth: 2, shape: 'box' },
        group3: { color: { background: 'green' }, borderWidth: 2, shape: 'box' }
      }
    };

    const network = new Network(container, data, options);
  }
}
