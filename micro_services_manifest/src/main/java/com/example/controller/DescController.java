package com.example.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.service.DescServiceImpl;
import com.example.service.ListerService;

import io.kubernetes.client.openapi.ApiException;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/desc")
public class DescController {
    @Autowired
    private DescServiceImpl DescService;

    @GetMapping("/poddesc/{namespace}/{podName}")
    public ResponseEntity<String> getPodDescriptions(@PathVariable String namespace, @PathVariable String podName) throws IOException, ApiException {
        try {
            String description = DescService.getPodDescriptions(namespace, podName);
            return ResponseEntity.ok(description);
        } catch (ApiException e) {
            // Handle API exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while fetching pod description");
        }    
    }
    
}
