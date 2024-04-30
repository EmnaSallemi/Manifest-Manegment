import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list-service.service';
import {  Network } from 'vis-network';
import { DataSet } from 'vis-data';

@Component({
  selector: 'app-service-test',
  templateUrl: './service-test.component.html',
  styleUrls: ['./service-test.component.scss']
})
export class ServiceTestComponent implements OnInit {

  
    
    podConnections: any[];
    public network: any;
    public nodes: DataSet<any>;
    public edges: DataSet<any>;

    namespaceNames: string[];
    services: string[];
    podNames: string[];
    deployments: string[];
    replicasets: string[];
    Nodes: string[];
    jobs: string[];
    configmaps:string[];
    endpoints: string[];
    ingress: string[];
    deamonsets:string[];
    PVCs:string[];
    SCs:string[];
    statefuls:string[];

    showServices= false;
    showPods = false;
    showNamespaces = false;
    showDeployments = false;
    showReplicasets = false;
    showJobs = false;
    showNodes = false;
    showEndpoints = false;
    showConfigMaps=false;
    showIngress=false;
    showDeamon=false;
    showPVC=false;
    showSC=false;
    showStateful=false;
    showBoth =false;
  
    constructor(private ListService: ListService) { }
  

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
    }; // You can specify visualization options here

    this.network = new Network(container, data, options);
  }


  ngOnInit(): void {
    this.nodes = new DataSet<any>();
    this.edges = new DataSet<any>();
    
  }

  togglePods(checked: boolean): void {
    this.showPods = !this.showPods;
    this.getAllPods();
  }

  toggleServices(checked: boolean): void {
    this.showServices = !this.showServices;
    this.getAllServices();
  }

  toggleNamespaces(checked: boolean): void {
    this.showNamespaces = !this.showNamespaces;
    this.getAllNamespaces();
  }
  toggleDeployments(checked: boolean): void {
    this.showDeployments = !this.showDeployments;
    this.getAllDeployments();
  }
  toggleReplicasets(checked: boolean): void {
    this.showReplicasets = !this.showReplicasets;
    this.getAllReplicasets();
  }

  toggleJobs(checked: boolean): void {
    this.showJobs = !this.showJobs;
    this.getAllJobs();
  }
  toggleNodes(checked: boolean): void {
    this.showNodes = !this.showNodes;
    this.getAllJobs();
  }
  toggleEndpoints(checked: boolean): void {
    this.showEndpoints = !this.showEndpoints;
    this.getAllEndpoints();
  }
  toggleConfigMaps(checked: boolean): void {
    this.showConfigMaps = !this.showConfigMaps;
    this.getAllConfigMaps();
  }
  toggleIngress(checked: boolean): void {
    this.showIngress= !this.showIngress;
    this.getAllIngress();
  }
  toggleDeamonset(checked: boolean): void {
    this.showDeamon= !this.showDeamon;
    this.getAllDeamonsets();
  }
  togglePVC(checked: boolean): void {
    this.showPVC= !this.showPVC;
    this.getAllPVCs();
  }
  toggleSC(checked: boolean): void {
    this.showSC= !this.showSC;
    this.getAllSC();
  }
  toggleStateful(checked: boolean): void {
    this.showStateful= !this.showStateful;
    this.getAllStateful();
  }
  // toggleBoth(checked: boolean): void {
    
  //   this.showBoth = !this.showBoth;
  //   this.getAllPods();
  //   this.getAllNamespaces();
  // }

  getAllPods(): void {
    this.ListService.getAllPods()
      .subscribe(podNames => {
        this.podNames = podNames;
        this.updateNodes();
        console.log('Pods:', this.podNames);
      });
      
  }
  getAllServices(): void {
    this.ListService.getAllServices()
      .subscribe(services => {
        this.services = services;
        this.updateNodes();
        console.log('Services:', this.services);
      });
      
  }

  getAllDeployments(): void{
    this.ListService.getAllDeployments()
    .subscribe(deployments => {
      this.deployments = deployments;
      this.updateNodes();
      console.log('deployments:', this.deployments);
    });
  }

  getAllNamespaces(): void{
    this.ListService.getAllNamespace()
    .subscribe(namespaceNames => {
      this.namespaceNames = namespaceNames;
      this.updateNodes();
      console.log('Namespaces:', this.namespaceNames);
    });
  }
  getAllReplicasets(): void{
    this.ListService.getAllReplicasets()
    .subscribe(replicasets => {
      this.replicasets = replicasets;
      this.updateNodes();
      console.log('replicasets:', this.replicasets);
    });
  }

  getAllJobs(): void{
    this.ListService.getAllJobs()
    .subscribe(jobs => {
      this.jobs = jobs;
      this.updateNodes();
      console.log('jobs:', this.jobs);
    });
  }
  getAllNodes(): void{
    this.ListService.getAllNodes()
    .subscribe(Nodes => {
      this.Nodes = Nodes;
      this.updateNodes();
      console.log('Nodes:', this.Nodes);
    });
  }
  getAllEndpoints(): void{
    this.ListService.getAllEndpoints()
    .subscribe(endpoints => {
      this.endpoints = endpoints;
      this.updateNodes();
      console.log('endpoints:', this.endpoints);
    });
  }
  getAllConfigMaps(): void{
    this.ListService.getAllConfigMaps()
    .subscribe(configmaps => {
      this.configmaps = configmaps;
      this.updateNodes();
      console.log('configmaps:', this.configmaps);
    });
  }
  getAllIngress(): void{
    this.ListService.getAllIngress()
    .subscribe(ingress => {
      this.ingress = ingress;
      this.updateNodes();
      console.log('ingress:', this.ingress);
    });
  }
  getAllDeamonsets(): void{
    this.ListService.getAllDeamonsets()
    .subscribe(deamonsets => {
      this.deamonsets = deamonsets;
      this.updateNodes();
      console.log('deamonsets:', this.deamonsets);
    });
  }
  getAllPVCs(): void{
    this.ListService.getAllPVC()
    .subscribe(PVCs => {
      this.PVCs = PVCs;
      this.updateNodes();
      console.log('PVCs:', this.PVCs);
    });
  }
  getAllSC(): void{
    this.ListService.getAllSC()
    .subscribe(SCs => {
      this.SCs = SCs;
      this.updateNodes();
      console.log('SCs:', this.SCs);
    });
  }
  getAllStateful(): void{
    this.ListService.getAllStateful()
    .subscribe(statefuls => {
      this.statefuls = statefuls;
      this.updateNodes();
      console.log('statefuls:', this.statefuls);
    });
  }

  updateNodes(): void {
    this.nodes.clear();
    if (this.showPods || this.showBoth) {
      this.podNames.forEach((podName, index) => {
        const nodeId = index + 1;
        const nodeName = `Pod: ${podName}`;
        this.nodes.add({ id: nodeId, label: nodeName, title: podName, shape: 'diamond', color: '#97C2FC' });
      });
    }

    if (this.showNamespaces || this.showBoth){
      this.namespaceNames.forEach((namespaceName, index) => {
        const nodeId = `namespace_${index + 1}`;
        const nodeName = `Namespace: ${namespaceName}`;
        this.nodes.add({ id: nodeId, label: nodeName, title: namespaceName, shape: 'circle', color: '#FFA500' });
      });}

      if (this.showServices || this.showBoth){
        this.services.forEach((service, index) => {
          const nodeId = `service_${index + 1}`;
          const nodeName = `srervice: ${service}`;
          this.nodes.add({ id: nodeId, label: nodeName, title: service, shape: 'triangle', color: '#232d4b' });
        });}

      if (this.showDeployments || this.showBoth){
        this.deployments.forEach((deployment, index) => {
          const nodeId = `deployment_${index + 1}`;
          const nodeName = `deployment: ${deployment}`;
          this.nodes.add({ id: nodeId, label: nodeName, title: deployment, shape: 'hexagon', color: '#CC99FF' });
        });}

      if (this.showReplicasets || this.showBoth){
        this.replicasets.forEach((replicaset, index) => {
          const nodeId = `replicaset_${index + 1}`;
          const nodeName = `replicaset: ${replicaset}`;
          this.nodes.add({ id: nodeId, label: nodeName, title: replicaset, shape: 'hexagon', color: '#f04641' });
        });}

       if (this.showJobs || this.showBoth){
        this.jobs.forEach((job, index) => {
          const nodeId = `job_${index + 1}`;
          const nodeName = `job: ${job}`;
          this.nodes.add({ id: nodeId, label: nodeName, title: job, shape: 'hexagon', color: 'green' });
        });}

        if (this.showNodes || this.showBoth){
          this.jobs.forEach((ND, index) => {
            const nodeId = `ND_${index + 1}`;
            const nodeName = `Node: ${ND}`;
            this.nodes.add({ id: nodeId, label: nodeName, title: ND, shape: 'hexagon', color: 'yellow' });
          });}
        if (this.showEndpoints || this.showBoth){
          this.endpoints.forEach((endpoint, index) => {
            const nodeId = `endpoint_${index + 1}`;
            const nodeName = `endpoint: ${endpoint}`;
            this.nodes.add({ id: nodeId, label: nodeName, title: endpoint, shape: 'hexagon', color: 'red' });
          });}
        
          if (this.showConfigMaps|| this.showBoth){
            this.configmaps.forEach((configmap, index) => {
              const nodeId = `configmap_${index + 1}`;
              const nodeName = `configmap: ${configmap}`;
              this.nodes.add({ id: nodeId, label: nodeName, title: configmap, shape: 'hexagon', color: 'black' });
            });}
          if (this.showIngress|| this.showBoth){
            this.ingress.forEach((ing, index) => {
              const nodeId = `ing_${index + 1}`;
              const nodeName = `ing: ${ing}`;
              this.nodes.add({ id: nodeId, label: nodeName, title: ing, shape: 'hexagon', color: 'black' });
            });}
          if (this.showDeamon|| this.showBoth){
            this.deamonsets.forEach((deamonset, index) => {
              const nodeId = `deamonset_${index + 1}`;
              const nodeName = `deamonset: ${deamonset}`;
              this.nodes.add({ id: nodeId, label: nodeName, title: deamonset, shape: 'hexagon', color: '#FF6666' });
            });}
            if (this.showPVC|| this.showBoth){
              this.PVCs.forEach((PVC, index) => {
                const nodeId = `PVC_${index + 1}`;
                const nodeName = `PVC: ${PVC}`;
                this.nodes.add({ id: nodeId, label: nodeName, title: PVC, shape: 'hexagon', color: '#FF6666' });
              });}
            if (this.showSC|| this.showBoth){
              this.SCs.forEach((SC, index) => {
                const nodeId = `SC_${index + 1}`;
                const nodeName = `SC: ${SC}`;
                this.nodes.add({ id: nodeId, label: nodeName, title: SC, shape: 'hexagon', color: '#FFCCE5' });
              });}
            if (this.showStateful|| this.showBoth){
              this.statefuls.forEach((stateful, index) => {
                const nodeId = `stateful_${index + 1}`;
                const nodeName = `stateful: ${stateful}`;
                this.nodes.add({ id: nodeId, label: nodeName, title: stateful, shape: 'hexagon', color: '#660033' });
              });}
          
    
  
    this.renderVisualization();
}

updateEdges(): void {
  this.edges.clear();

  this.podConnections.forEach(connection => {
      this.edges.add({ from: connection.source, to: connection.target });
  });

  this.renderVisualization();
}





}
