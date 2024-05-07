package com.example.CreateReource.FORM.services;

import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1PodBuilder;


import java.io.IOException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.config.KubernetesConfigService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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
    public void createService(String response) throws ApiException, IOException {
        kubernetesConfigService.configureKubernetesAccess();
        CoreV1Api api = new CoreV1Api();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(response);

        String name = jsonNode.get("metadata").get("name").asText();
        String namespace = jsonNode.get("metadata").get("namespace").asText();
        String image = jsonNode.get("spec").get("containers").get(0).get("image").asText();
        
    }
}
