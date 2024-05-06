package com.example.CreateReource.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.CreateReource.services.CreateResource;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.kubernetes.client.openapi.ApiException;
import io.kubernetes.client.util.Yaml;

@RestController
public class CreateController {

    private final CreateResource createResource;

    @Autowired
    public CreateController(CreateResource createResource) {
        this.createResource = createResource;
    }

    @PostMapping("/api/create/resource")
    public ResponseEntity<String> createResourceFromYaml(MultipartFile yamlFile) {
        try {
            // Read the YAML content from the file
            String yamlContent = new String(yamlFile.getBytes());
            Yaml yaml = new Yaml();
            Object obj = yaml.load(yamlContent);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonContent = objectMapper.writeValueAsString(obj);
            JsonNode rootNode = objectMapper.readTree(jsonContent);
            String kind = rootNode.get("kind").asText();

            if ("Pod".equals(kind)) {
                createResource.createPodFromYaml(yamlContent);
                return ResponseEntity.ok("Pod created successfully from YAML");
            } else if ("Service".equals(kind)) {
                createResource.createServiceFromYaml(yamlContent);
                return ResponseEntity.ok("Service created successfully from YAML");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsupported resource kind: " + kind);
            }
        } catch (IOException | ApiException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create resource from YAML: " + e.getMessage());
        }
    }
}
