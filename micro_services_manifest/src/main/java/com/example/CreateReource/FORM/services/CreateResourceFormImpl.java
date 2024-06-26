package com.example.CreateReource.FORM.services;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.config.KubernetesConfigService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.AppsV1Api;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1ConfigMap;
import io.kubernetes.client.openapi.models.V1ConfigMapBuilder;
import io.kubernetes.client.openapi.models.V1Container;
import io.kubernetes.client.openapi.models.V1ContainerPort;
import io.kubernetes.client.openapi.models.V1Deployment;
import io.kubernetes.client.openapi.models.V1DeploymentSpec;
import io.kubernetes.client.openapi.models.V1LabelSelector;
import io.kubernetes.client.openapi.models.V1ObjectMeta;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1PodBuilder;
import io.kubernetes.client.openapi.models.V1PodSpec;
import io.kubernetes.client.openapi.models.V1PodTemplateSpec;


@Service
public class CreateResourceFormImpl implements CreateResourceForm {
    private final KubernetesConfigService kubernetesConfigService;
    
    @Autowired
    public CreateResourceFormImpl(KubernetesConfigService kubernetesConfigService) {
        this.kubernetesConfigService = kubernetesConfigService;
    }

    @Override
    public void createPod(String response) throws ApiException, IOException {
        kubernetesConfigService.configureKubernetesAccess();
        CoreV1Api api = new CoreV1Api();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);

        String name = jsonNode.get("metadata").get("name").asText();
        String namespace = jsonNode.get("metadata").get("namespace").asText();
        String image = jsonNode.get("spec").get("containers").get(0).get("image").asText();

        // Create and Deploy pod to Kubernetes 
        V1Pod pod = new V1PodBuilder()
                .withNewMetadata()
                    .withName(name)
                    .withNamespace(namespace)
                .endMetadata()
                .withNewSpec()
                    .addNewContainer()
                        .withName(name)
                        .withImage(image)
                        .withNewResources()
                            .withLimits(new HashMap<>())
                        .endResources()
                    .endContainer()
                .endSpec()
                .build();
                
                api.createNamespacedPod(namespace, pod, null, null, null, null);
        System.out.println("Pod created successfully: " + name);
    }


    @Override
    public void createConfigMap(String response) throws ApiException, IOException {
        // Configure Kubernetes access
        kubernetesConfigService.configureKubernetesAccess();
    
        // Initialize Kubernetes API client
        CoreV1Api api = new CoreV1Api();
    
        // Parse JSON response
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
    
        // Extract ConfigMap metadata
        String name = jsonNode.get("metadata").get("name").asText();
        String namespace = jsonNode.get("metadata").get("namespace").asText();
    
        // Extract ConfigMap data, if present
        JsonNode dataNode = jsonNode.get("data");
    
        // Create ConfigMap object
        V1ConfigMap configMap = new V1ConfigMapBuilder()
                .withNewMetadata()
                    .withName(name)
                    .withNamespace(namespace)
                .endMetadata()
                .withImmutable(jsonNode.get("immutable").asBoolean())
                .withData(dataNode != null ? toMap(dataNode) : null)
                .build();
    
        // Deploy ConfigMap to cluster
        api.createNamespacedConfigMap(namespace, configMap, null, null, null, null);
        System.out.println("ConfigMap deployed successfully: " + name);
    }
    
    private Map<String, String> toMap(JsonNode dataNode) {
        Map<String, String> dataMap = new HashMap<>();
        dataNode.fields().forEachRemaining(entry -> {
            dataMap.put(entry.getKey(), entry.getValue().asText());
        });
        return dataMap;
    }
    

    @Override
    public void createDeployment(String response) throws ApiException, IOException {
        // Configure Kubernetes access
        kubernetesConfigService.configureKubernetesAccess();
    
        // Initialize Kubernetes API client
        AppsV1Api api = new AppsV1Api();
    
        // Parse JSON response
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);
    
        // Extract deployment metadata
        String name = jsonNode.get("metadata").get("name").asText();
        String namespace = jsonNode.get("metadata").get("namespace").asText();
    
        // Extract replicas
        int replicas = jsonNode.get("spec").get("replicas").asInt();
    
        // Extract labels
        Map<String, String> labels = new HashMap<>();
        JsonNode labelsNode = jsonNode.get("metadata").get("labels");
        labelsNode.fields().forEachRemaining(entry -> labels.put(entry.getKey(), entry.getValue().asText()));
    
        // Extract container details
        String image = jsonNode.get("spec").get("template").get("spec").get("containers").get(0).get("image").asText();
        int containerPort = jsonNode.get("spec").get("template").get("spec").get("containers").get(0).get("ports").get(0).get("containerPort").asInt();
    
        // Create deployment object
        V1Deployment deployment = new V1Deployment()
                .apiVersion("apps/v1")
                .kind("Deployment")
                .metadata(new V1ObjectMeta().name(name).namespace(namespace).labels(labels))
                .spec(new V1DeploymentSpec()
                        .replicas(replicas)
                        .selector(new V1LabelSelector().matchLabels(labels))
                        .template(new V1PodTemplateSpec()
                                .metadata(new V1ObjectMeta().labels(labels))
                                .spec(new V1PodSpec()
                                        .containers(List.of(
                                                new V1Container()
                                                        .name(name)
                                                        .image(image)
                                                        .ports(List.of(
                                                                new V1ContainerPort().containerPort(containerPort)
                                                        ))
                                        ))
                                )
                        )
                );
    
        // Create deployment in Kubernetes cluster
        api.createNamespacedDeployment(namespace, deployment, null, null, null,null);
    
        System.out.println("Deployment created successfully: " + name);
    }
    
      
}
