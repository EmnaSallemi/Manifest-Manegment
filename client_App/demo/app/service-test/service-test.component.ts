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
  //selectedPod: string | null = null;
  selectedResource: string | null = null;
  ressourceName: string[];
  resourceType: string[];
  selectedType: string;
 
  ngOnInit(): void {
    this.nodes = new DataSet<any>();
    this.edges = new DataSet<any>();
  }
  onResourceSelected(resourceName: string, resourceType: string): void {
    this.selectedResource = resourceName;
    this.selectedType = resourceType;
    
  }

  isFrameOpen: boolean = false;

  closeFrame(): void {
    this.isFrameOpen = false;
  }

  onNodeClick(properties: any): void {
    const selectedNodes = this.network.getSelectedNodes();
    
    this.isFrameOpen = true;

    selectedNodes.forEach((nodeId: string) => {
        const node = this.network.body.nodes[nodeId];
        this.selectedResource = node.options.title;
        // const labelParts = node.options.label.split(':');
        // const resourceType = labelParts[0].trim().toLowerCase(); // Extracted resource type


        const labelParts = node.options.label.split(':');
        if (labelParts.length !== 2) {
            console.error('Invalid label format:', node.options.label);
            return;
        }

        const resourceType = labelParts[0].trim().toLowerCase(); // Extracted resource type
        const resourceName = labelParts[1].trim(); // Extracted resource name

        this.selectedType= resourceType;

        console.log('Resource Type:', resourceType);
        console.log('Resource Name:', resourceName);

        //console.log(node.options.label);
        //console.log(resourceType);
        // Fetch resource description
        //console.log(node.options.title);
        this.descService.getResourceDescriptions(resourceType,resourceName)
        .subscribe(
            (description: string) => {
                console.log('Resource Description:', description);
            },
            (error) => {
                console.error('Error fetching resource description:', error);
            }
        );
    });
  }



    podConnections: any[];
    public network: any;
    public nodes: DataSet<any>;
    public edges: DataSet<any>;

    namespaceNames: string[];
    services: string[];
    podNames: string[];
    deployments: string[];
    replicasets: string[];
    Nodess: string[];
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

   
    constructor(private router: Router,private ListService: ListService, private descService: DescServiceService) { }

    
  
    showCheckboxes: boolean = false;

    toggleCheckboxList(): void {
      this.showCheckboxes = !this.showCheckboxes;
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
      }; // You can specify visualization options here
      // this.network.on('click', this.onNodeClick.bind(this));

      this.network = new Network(container, data, options);
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
    this.getAllNodes();
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
    .subscribe(Nodess => {
      this.Nodess = Nodess;
      this.updateNodes();
      console.log('Nodes:', this.Nodess);
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
          const nodeName = `service: ${service}`;
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
          this.Nodess.forEach((ND, index) => {
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
            this.ingress.forEach((ingress, index) => {
              const nodeId = `ingress_${index + 1}`;
              const nodeName = `ingress: ${ingress}`;
              this.nodes.add({ id: nodeId, label: nodeName, title: ingress, shape: 'hexagon', color: 'black' });
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
              this.SCs.forEach((sc, index) => {
                const nodeId = `sc_${index + 1}`;
                const nodeName = `sc: ${sc}`;
                this.nodes.add({ id: nodeId, label: nodeName, title: sc, shape: 'hexagon', color: '#FFCCE5' });
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
