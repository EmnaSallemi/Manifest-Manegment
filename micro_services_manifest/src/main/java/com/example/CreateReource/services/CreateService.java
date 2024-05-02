package com.example.CreateReource.services;

import java.io.IOException;


import io.kubernetes.client.openapi.ApiException;

public interface CreateService {
    void createPodFromYaml(String yamlContent) throws IOException, ApiException;
}
