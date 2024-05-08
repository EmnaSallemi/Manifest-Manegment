import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListService } from '../services/list-service.service';
import {  Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { DescServiceService } from '../manifest-desc/services/desc-service.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
 
@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss'],
  animations: [
    trigger('frameAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(100%)'
      })),
      transition('closed => open', [
        animate('0.5s ease-out')
      ]),
      transition('open => closed', [
        animate('0.5s ease-out')
      ])
    ])
  ]
  
})
export class ServiceTestComponent implements OnInit {
  selectedResource: string[];
  selectedType: string[];
  ressourceName: string[];
  resourceType: string[];
 
  
    isFrameOpen: boolean = false;
 
  
    podConnections: any[];
    public network: any;
    public nodes: DataSet<any>;
    public edges: DataSet<any>;
 
    podNames: string[];
    namespaceNames: string[];
    deployments:string[];
    statefulsetNames:string[];
    services:string[];
    replicasetNames:string[];
    jobsNames:string[];
    nodesNames:string[];
    endpointsNames:string[];
    configmapsNames:string[];
    ingressNames:string[];
    daemonsetNames:string[];
    pvcNames:string[];
    scNames:string[];
  
 
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
 
   
   
    constructor(private router: Router,private ListService: ListService, private descService: DescServiceService) { }
 
    ngOnInit(): void {
      this.nodes = new DataSet<any>();
      this.edges = new DataSet<any>();
    }
   
    
 
    closeFrame(): void {
      this.isFrameOpen = false;
    }
 
   
    onNodeClick(properties: any): void {
      const selectedNodes = this.network.getSelectedNodes();
      this.isFrameOpen = true;
      
      selectedNodes.forEach((nodeId: string) => {
        const node = this.network.body.nodes[nodeId];
    
        const labelParts = node.options.label.split(':');
    
        if (labelParts.length !== 2) {
          console.error('Invalid label format:', node.options.label);
          return;
        }
    
        const resourceType = labelParts[0].trim().toLowerCase();
        const resourceName = labelParts[1].trim();
    
        this.descService.getResourceDescriptions(resourceType, resourceName)
        .subscribe({
          next: (description: string) => {
            console.log('Resource Description:', description);
            // Update resource details in the desc component
            this.selectedResource = resourceName;
            this.selectedType = resourceType;
          },
          error: (error) => {
            console.error('Error fetching resource description:', error);
          }
        });
      
      });
    }
  
 
    getAllManifests(): void {
  
      if (this.selectedResource.includes('pod')) {
        this.ListService.getAllPods().subscribe(podNames => {
          this.podNames = podNames;
          this.addPodNodes();
          console.log('Podsssss:', this.podNames);
        });
      }
  
      if (this.selectedResource.includes('namespace')) {
        this.ListService.getAllNamespace().subscribe(namespaceNames => {
          this.namespaceNames = namespaceNames;
          this.addNamespaceNodes();
          console.log('namespaces:', this.namespaceNames);
        });
      }
      if( this.selectedResource.includes('service')){
        this.ListService.getAllServices().subscribe(service => {
          this.services = service;
          this.addServiceNodes();
          console.log('serviceNames:', this.services);
        });
      }
      if( this.selectedResource.includes('deployment')){
        this.ListService.getAllDeployments()
        .subscribe(deployment => {
          this.deployments = deployment;
          this.addDeploymentNodes();
          console.log('deploymentNames:', this.deployments);
        });
      }
      this.nodes.clear();
    }
    addPodNodes(): void {
      // this.nodes.clear();
 
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
    
    addServiceNodes():void{
      this.services.forEach((serv, index) => {
        const nodeId = `service_${index + 1}`;
        const nodeName = `service: ${serv}`;
        this.nodes.add({ id: nodeId, label: nodeName, title: serv, shape: 'triangle', color: '#232d4b' });
      });
      this.renderVisualization();
    }
 
    addDeploymentNodes():void{
      this.deployments.forEach((deployment, index) => {
        const nodeId = `deployment_${index + 1}`;
        const nodeName = `deployment: ${deployment}`;
        this.nodes.add({ id: nodeId, label: nodeName, title: deployment, shape: 'triangle', color: '#232d4b' });
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
        nodes: {
          // shape: 'circle'
        }
      };
      this.network = new Network(container, data, options);
    }
 
  updateEdges(): void {
    this.edges.clear();
  
    this.podConnections.forEach(connection => {
        this.edges.add({ from: connection.source, to: connection.target });
    });
  
    this.renderVisualization();
  }
 
}