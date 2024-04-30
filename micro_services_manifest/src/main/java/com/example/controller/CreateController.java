package com.example.controller;

import java.io.FileReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.CreateService;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.Configuration;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Pod;
import io.kubernetes.client.openapi.models.V1PodBuilder;
import io.kubernetes.client.util.ClientBuilder;
import io.kubernetes.client.util.KubeConfig;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/create")
public class CreateController {
    @Autowired
    private CreateService CreateService;
    
    @PostMapping("/pod")
    public String createPod() {
        try {
            String kubeConfigPath = System.getenv("HOME") + "/.kube/config";
            ApiClient client = ClientBuilder.kubeconfig(KubeConfig.loadKubeConfig(new FileReader(kubeConfigPath))).build();
            Configuration.setDefaultApiClient(client);
            //CoreV1Api api = new CoreV1Api();

        
            // Set the namespace where you want to create the Pod
            String namespace = "default";

            // Create an instance of the CoreV1Api
            CoreV1Api api = new CoreV1Api(client);

            // Define the Pod object
            V1Pod pod = new V1PodBuilder()
                    .withNewMetadata().withName("example-pod").endMetadata()
                    .withNewSpec().addNewContainer()
                    .withName("example-container")
                    .withImage("nginx")
                    .endContainer()
                    .endSpec()
                    .build();

            // Create the Pod in the specified namespace
            V1Pod createdPod = api.createNamespacedPod(namespace, pod, null, null, null, namespace);

            return "Pod created successfully: " + createdPod.getMetadata().getName();
        } catch (ApiException e) {
            return "Exception when creating Pod: " + e.getMessage();
        } catch (Exception e) {
            return "Exception: " + e.getMessage();
        }
    }
    // @PostMapping("/pod")
    // public ResponseEntity<String> createPod() {
    //     try {
    //         CreateService.createPod("default");
    //         return ResponseEntity.ok("Pod creation request submitted successfully");
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create pod");
    //     }
    // }

}
