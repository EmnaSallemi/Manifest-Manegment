package com.example.CreateReource.YAML.services;

import java.io.IOException;

import io.kubernetes.client.openapi.ApiException;


public interface CreateResource {
    void createPodFromYaml(String yamlContent) throws IOException, ApiException;
    public void createServiceFromYaml(String yamlContent) throws IOException, ApiException;
}
