package com.example.CreateReource.FORM.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CreateReource.FORM.services.CreateResourceForm;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class ResponseController {
    private final CreateResourceForm createResource;

    @Autowired
    public ResponseController(CreateResourceForm createResource) {
        this.createResource = createResource;
    }
    

    @PostMapping("/api/create/resource/form")
    public ResponseEntity<String> handleResourceResponse(@RequestBody String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(response); 
            String kind = jsonNode.get("kind").asText(); 
              if ("Pod".equals(kind)) {
                createResource.createPod(response);
                return ResponseEntity.ok("Pod created successfully ");
            } else if ("ConfigMap".equals(kind)) {
                createResource.createConfigMap(response);
                return ResponseEntity.ok("ConfigMap created successfully ");
            } else if ("Deployment".equals(kind)) {
                createResource.createDeployment(response);
                return ResponseEntity.ok("Deployment created successfully ");
            }
             else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unsupported resource kind: " + kind);
            }
          
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to process response: " + e.getMessage());
        }
    }
}
