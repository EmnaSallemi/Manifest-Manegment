package com.example.CreateReource.FORM.services;

import java.io.IOException;

import io.kubernetes.client.openapi.ApiException;

public interface CreateResourceForm {
    void createPod(String response) throws ApiException, IOException;
    public void createConfigMap(String response) throws ApiException, IOException;
    public void createDeployment(String response) throws ApiException, IOException;
}
