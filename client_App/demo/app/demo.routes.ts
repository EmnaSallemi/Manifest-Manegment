import { Route } from '@angular/router';
import { DemoComponent } from './add-resource/create-with-form/components/demo.component';
import { ServiceTestComponent} from './service-test/service-test.component';
import { NetworkVisualizationComponent } from './network-visualization/network-visualization.component';
import { Component } from '@angular/core';
import { WorkloadDetailsComponent } from './workload-details/workload-details.component';
import { CreateWithYamlComponent } from './add-resource/create-with-yaml/components/create-with-yaml.component';

export const routes: Route[] = [
  { path: '', 
    component: WorkloadDetailsComponent,
    children: [    ]  
  },
  { path: 'network', component: NetworkVisualizationComponent },
  { path: 'servicetest', component: ServiceTestComponent },
  { path: 'workload-details', component: WorkloadDetailsComponent},
  { path: 'addResource/form', component: DemoComponent },
  {path:'addResource/yaml', component: CreateWithYamlComponent },
  

];
