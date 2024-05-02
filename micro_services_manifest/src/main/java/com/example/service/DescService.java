package com.example.service;

import java.io.FileNotFoundException;
import java.io.IOException;

import io.kubernetes.client.openapi.ApiException;

public  interface DescService {

    public String getPodDescriptions(String namespace, String podName) throws ApiException, FileNotFoundException, IOException ;
    
} 
