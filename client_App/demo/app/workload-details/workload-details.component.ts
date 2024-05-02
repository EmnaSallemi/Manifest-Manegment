import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list-service.service';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workload-details',
  templateUrl: './workload-details.component.html',
  styleUrls: ['./workload-details.component.scss']
})
export class WorkloadDetailsComponent implements OnInit {

  selectedManifestTypes: string[] = [];
  podNames: string[];
  namespaceNames: string[];
  deploymentNames:string[];
  statefulsetNames:string[];
  serviceNames:string[];
  replicasetNames:string[];
  jobsNames:string[];
  nodesNames:string[];
  endpointsNames:string[];
  configmapsNames:string[];
  ingressNames:string[];
  daemonsetNames:string[];
  pvcNames:string[];
  scNames:string[];
  



  public network: any;
  public nodes: DataSet<any>;
  public edges: DataSet<any>;


  buttonText = '+';
  showChoices = false;
  selectedChoice: string | null = null;

  constructor(private ListService: ListService, private router: Router) { }

  options = [
    { value: 'pod', label: 'Pod' },
    { value: 'namespace', label: 'Namespace' },
    { value: 'deployment', label: 'Deployment' },
    { value: 'statefulset', label: 'Statefulset' },
    { value: 'service', label: 'Service' },
    { value: 'replicaset', label: 'Replicaset' },
    { value: 'jobs', label: 'Jobs' },
    { value: 'nodes', label: 'Nodes' },
    { value: 'endpoints', label: 'Endpoints' },
    { value: 'configmaps', label: 'Configmap' },
    { value: 'ingress', label: 'Ingress' }, 
    { value: 'daemonSet', label: 'Daemonset' },
    { value: 'pvc', label: 'PVC' },
    { value: 'sc', label: 'SC' },
  
    

  ];

  selectChoice(choice: string) {
    this.selectedChoice = choice;
    console.log('Selected choice:', choice);
    
    if (choice === 'Yml File') {
      this.router.navigate(['/ymlFile']); 
    }else if(choice== 'Form') {
      this.router.navigate(['/dynamicForm']);
    }

    }

  ngOnInit(): void {
    this.nodes = new DataSet<any>();
    this.edges = new DataSet<any>();
  }

  getAllManifests(): void {
    this.nodes.clear();

    if (this.selectedManifestTypes.includes('pod')) {
      this.ListService.getAllPods().subscribe(podNames => {
        this.podNames = podNames;
        this.addPodNodes();
        console.log('Pods:', this.podNames);
      });
      
    }

    if (this.selectedManifestTypes.includes('namespace')) {
      this.ListService.getAllNamespace().subscribe(namespaceNames => {
        this.namespaceNames = namespaceNames;
        this.addNamespaceNodes();
        console.log('namespaces:', this.namespaceNames);
      });
    }
  }

  addPodNodes(): void {
    this.podNames.forEach((podName, index) => {
      const nodeId = index + 1;
      const nodeName = `Pod: ${podName}`;
      this.nodes.add({ id: nodeId, label: nodeName, title: podName, shape: 'diamond', color: '#97C2FC' });
    });

    this.renderVisualization();
  }

  addNamespaceNodes(): void {
    this.namespaceNames.forEach((namespaceName, index) => {
      const nodeId = `namespace_${index + 1}`;
      const nodeName = `Namespace: ${namespaceName}`;
      this.nodes.add({ id: nodeId, label: nodeName, title: namespaceName, shape: 'circle', color: '#FFA500' });
    });

    this.renderVisualization();
  }

  renderVisualization(): void {
    const container = document.getElementById('network');
    const data = {
      nodes: this.nodes,
      edges: this.edges
    };
    const options = {
      nodes: {}
    }; // You can specify visualization options here

    this.network = new Network(container, data, options);
  }

}
