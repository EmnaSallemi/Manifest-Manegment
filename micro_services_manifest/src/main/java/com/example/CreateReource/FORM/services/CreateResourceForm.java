package com.example.CreateReource.FORM.services;

import java.io.IOException;

import io.kubernetes.client.openapi.ApiException;

public interface CreateResourceForm {
    void createPod(String response) throws ApiException, IOException;
    public void createService(String response) throws ApiException, IOException;
}
