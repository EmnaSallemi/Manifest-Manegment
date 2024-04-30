package com.example.service;

import java.io.FileReader;
import java.io.IOException;

import io.kubernetes.client.custom.IntOrString;
import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Service;
import io.kubernetes.client.openapi.models.V1ServiceBuilder;
import io.kubernetes.client.util.ClientBuilder;
import io.kubernetes.client.util.KubeConfig;
import io.kubernetes.client.util.Yaml;
import org.springframework.stereotype.Service;

@Service
public class CreateServiceImpl implements CreateService {

    public void createAndDeployService() throws IOException, ApiException {
        String kubeConfigPath = System.getenv("HOME") + "/.kube/config";
        ApiClient client = ClientBuilder.kubeconfig(KubeConfig.loadKubeConfig(new FileReader(kubeConfigPath))).build();
        Configuration.setDefaultApiClient(client);
        CoreV1Api api = new CoreV1Api();

        
        //Create Service object
        V1Service svc =
                new V1ServiceBuilder()
                        .withNewMetadata()
                        .withName("aservice")
                        .endMetadata()
                        .withNewSpec()
                        .withSessionAffinity("ClientIP")
                        .withType("NodePort")
                        .addNewPort()
                        .withProtocol("TCP")
                        .withName("client")
                        .withPort(8008)
                        .withNodePort(8080)
                        .withTargetPort(new IntOrString(8080))
                        .endPort()
                        .endSpec()
                        .build();

        // Print YAML representation of the service
        System.out.println(Yaml.dump(svc));


        V1Service createResult =
                api.createNamespacedService("default", svc, null, null, null, null);
        System.out.println(createResult);
    }

    public void deleteService(String serviceName) throws ApiException {
        CoreV1Api api = new CoreV1Api();
        V1Service deleteResult =
                api.deleteNamespacedService(serviceName, "default", null, null, null, null, null, null);
        System.out.println(deleteResult);
    }
}
