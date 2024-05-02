package com.example.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.KubernetesConfig.KubernetesConfigService;

import io.kubernetes.client.openapi.ApiClient;
import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.openapi.apis.CoreV1Api;
import io.kubernetes.client.openapi.models.V1Container;
import io.kubernetes.client.openapi.models.V1OwnerReference;
import io.kubernetes.client.openapi.models.V1Pod;

@Service
public class DescServiceImpl implements DescService {

    @Autowired
    private KubernetesConfigService KubernetesConfigService;

    @Override
    public String getPodDescriptions(String namespace, String podName)
            throws ApiException, FileNotFoundException, IOException {
        // Créer un client pour interagir avec l'API Kubernetes
        ApiClient client = KubernetesConfigService.configureKubernetesAccess();

        // Créer une instance de l'API CoreV1Api
        CoreV1Api api = new CoreV1Api(client);

        // Retrieve the pod by name and namespace
        V1Pod pod = api.readNamespacedPod(podName, namespace, null);

        // Liste pour stocker les descriptions des pods

        return generatePodDescription(pod);
    }

    private String generatePodDescription(V1Pod pod) {
        // Générer la description du pod en fonction de ses attributs
        // Vous pouvez personnaliser cette méthode pour inclure plus d'informations si
        // nécessaire
        StringBuilder descriptionBuilder = new StringBuilder();

        descriptionBuilder.append("Name: ").append(pod.getMetadata().getName()).append("\n");
        descriptionBuilder.append("Namespace: ").append(pod.getMetadata().getNamespace()).append("\n");
        descriptionBuilder.append("Labels: ").append(pod.getMetadata().getLabels()).append("\n");
        descriptionBuilder.append("Status: ").append(pod.getStatus().getPhase()).append("\n");
        descriptionBuilder.append("Annotations: ").append(pod.getMetadata().getAnnotations()).append("\n");
        descriptionBuilder.append("Creation Timestamp: ").append(pod.getMetadata().getCreationTimestamp()).append("\n");
        descriptionBuilder.append("Owner References: ").append(pod.getMetadata().getOwnerReferences()).append("\n");

        descriptionBuilder.append("Node Name: ").append(pod.getSpec().getNodeName()).append("\n");
        descriptionBuilder.append("Service Account Name: ").append(pod.getSpec().getServiceAccountName()).append("\n");
        descriptionBuilder.append("Host Network: ").append(pod.getSpec().getHostNetwork()).append("\n");
        descriptionBuilder.append("Host PID: ").append(pod.getSpec().getHostPID()).append("\n");
        descriptionBuilder.append("Host IPC: ").append(pod.getSpec().getHostIPC()).append("\n");
        descriptionBuilder.append("Containers: \n");

        // Ajouter plus d'informations au besoin
        descriptionBuilder.append("Pod IP: ").append(pod.getStatus().getPodIP()).append("\n");

        // Include container details
            // Containers
        List<V1Container> containers = pod.getSpec().getContainers();
        for (V1Container container : containers) {
            descriptionBuilder.append("\tName: ").append(container.getName()).append("\n");
            descriptionBuilder.append("\tImage: ").append(container.getImage()).append("\n");
            descriptionBuilder.append("\tCommand: ").append(container.getCommand()).append("\n");
            descriptionBuilder.append("\tArgs: ").append(container.getArgs()).append("\n");
            descriptionBuilder.append("\tWorking Directory: ").append(container.getWorkingDir()).append("\n");
            descriptionBuilder.append("\tPorts: ").append(container.getPorts()).append("\n");
            descriptionBuilder.append("\tVolume Mounts: ").append(container.getVolumeMounts()).append("\n");
            descriptionBuilder.append("\tResources: ").append(container.getResources()).append("\n");
            descriptionBuilder.append("\tEnvironment Variables: ").append(container.getEnv()).append("\n");
            descriptionBuilder.append("\n");
        }
        descriptionBuilder.append("Status: ").append(pod.getStatus().getPhase()).append("\n");
        descriptionBuilder.append("Pod IP: ").append(pod.getStatus().getPodIP()).append("\n");
        descriptionBuilder.append("Pod Host IP: ").append(pod.getStatus().getHostIP()).append("\n");
        descriptionBuilder.append("Conditions: ").append(pod.getStatus().getConditions()).append("\n");
        descriptionBuilder.append("Message: ").append(pod.getStatus().getMessage()).append("\n");
        descriptionBuilder.append("Reason: ").append(pod.getStatus().getReason()).append("\n");
        descriptionBuilder.append("StartTime: ").append(pod.getStatus().getStartTime()).append("\n");
        descriptionBuilder.append("Deletion Timestamp: ").append(pod.getMetadata().getDeletionTimestamp()).append("\n");
        
        if (pod.getMetadata().getOwnerReferences() != null && !pod.getMetadata().getOwnerReferences().isEmpty()) {
            descriptionBuilder.append("Controlled By: ");
            // Iterate through ownerReferences
            for (V1OwnerReference ownerReference : pod.getMetadata().getOwnerReferences()) {
                descriptionBuilder.append(ownerReference.getKind()).append("/").append(ownerReference.getName());
                // If there are multiple ownerReferences, separate them with commas
                if (!ownerReference.equals(pod.getMetadata().getOwnerReferences().get(pod.getMetadata().getOwnerReferences().size() - 1))) {
                    descriptionBuilder.append(", ");
                }
            }
        }
        return descriptionBuilder.toString();
    }
    
}
