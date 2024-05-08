import { Route } from '@angular/router';
import { DemoComponent } from './demo.component';
import { YmlFileComponent } from './yml-file/yml-file.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ServiceTestComponent} from './service-test/service-test.component';
import { Component } from '@angular/core';
import { WorkloadDetailsComponent } from './workload-details/workload-details.component';
import { DescComponent } from './manifest-desc/desc/desc.component';
export const routes: Route[] = [
  { path: '', 
    component: DemoComponent,
    children: [    ]  
  },
  { path: 'ymlFile', component: YmlFileComponent },
  { path: 'dynamicForm', component: DynamicFormComponent },
  { path: 'servicetest', component: ServiceTestComponent },
  { path: 'workload-details', component: WorkloadDetailsComponent},
  { path: 'desc', component: DescComponent},
  

];
