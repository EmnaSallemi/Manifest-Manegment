package com.example.service;

import java.io.IOException;


import io.kubernetes.client.openapi.ApiException;

public interface CreateService {
    //public V1Pod createPodFromFile(String filePath) throws IOException, ApiException ;
    public void deleteService(String serviceName) throws ApiException;
    public void createAndDeployService() throws IOException, ApiException;
}