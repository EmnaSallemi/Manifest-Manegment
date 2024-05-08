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

import io.kubernetes.client.openapi.ApiException;

@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/desc")
public class DescController {
    @Autowired
    private DescServiceImpl DescService;

    @GetMapping("/{resourceType}/{ressourceName}")
    public ResponseEntity<String> getResourceDescriptions( @PathVariable String ressourceName,@PathVariable String resourceType) throws IOException, ApiException {
            String description = DescService.getResourceDescriptions( ressourceName, resourceType);
            return ResponseEntity.ok(description);
        
    }

      
    }
    

