package com.example.CreateReource.services;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.config.KubernetesConfigService;

import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1Service;
import io.kubernetes.client.util.Yaml;

@Service
public class CreateResourceImpl implements CreateResource {

    private final KubernetesConfigService kubernetesConfigService;

    @Autowired
    public CreateResourceImpl(KubernetesConfigService kubernetesConfigService) {
        this.kubernetesConfigService = kubernetesConfigService;
    }

    //Pod Creation
    @Override
    public void createPodFromYaml(String yamlContent) throws IOException, ApiException {
        kubernetesConfigService.configureKubernetesAccess();
        CoreV1Api api = new CoreV1Api();
        V1Pod yamlPod = (V1Pod) Yaml.load(yamlContent);
        if (yamlPod.getMetadata() != null && yamlPod.getMetadata().getNamespace() != null ) {
            String namespace = yamlPod.getMetadata().getNamespace();
            api.createNamespacedPod(namespace, yamlPod, null, null, null, null);
            System.out.println("THE Pod is created successufully !");
        } else {
            System.out.println("Namespace not found in YAML content");
        }
     }


      //Service Creation
      @Override
      public void createServiceFromYaml(String yamlContent) throws IOException, ApiException {
        CoreV1Api api = new CoreV1Api();
        V1Service yamlSvc = (V1Service) Yaml.load(yamlContent);
        if (yamlSvc.getMetadata() != null && yamlSvc.getMetadata().getNamespace() != null ) {
            String namespace = yamlSvc.getMetadata().getNamespace();
            api.createNamespacedService(namespace, yamlSvc, null, null, null, null);
            System.out.println("THE Service is created successufully !");
        } else {
            System.out.println("Namespace not found in YAML content");
            api.createNamespacedService("default", yamlSvc, null, null, null, null);
            System.out.println("Service created in default namespace");
        }

    }
}

