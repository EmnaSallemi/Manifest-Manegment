package com.example.CreateReource.services;
import java.io.IOException;
import java.util.Map;

import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.util.Yaml;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.config.KubernetesConfigService;

@Service
public class CreateServiceImpl implements CreateService {

    @Autowired
    private KubernetesConfigService kubernetesConfigService;

    @Override
    public void createPodFromYaml(String yamlContent) throws IOException, ApiException {
        kubernetesConfigService.configureKubernetesAccess();  
        CoreV1Api api = new CoreV1Api();
        V1Pod yamlPod = (V1Pod) Yaml.load(yamlContent);
        if (yamlPod.getMetadata() != null && yamlPod.getMetadata().getNamespace() != null) {
            String namespace = yamlPod.getMetadata().getNamespace();
            V1Pod createResult = api.createNamespacedPod(namespace, yamlPod, null, null, null, null);
            System.out.println(createResult);
        } else {
            System.out.println("Namespace not found in YAML content");
        }
    }
}
