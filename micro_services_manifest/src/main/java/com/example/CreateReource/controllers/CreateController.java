package com.example.CreateReource.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.CreateReource.services.CreateService;

import io.kubernetes.client.openapi.ApiException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CreateController {
    
    @Autowired
    private CreateService createService;
    
    @PostMapping("/api/create/resource")
    public ResponseEntity<String> createPodFromYaml(@RequestBody String yamlContent) {
        try {
            createService.createPodFromYaml(yamlContent);
            return ResponseEntity.ok("Pod created successfully");
        } catch (IOException | ApiException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create pod");
        }
    }
}
