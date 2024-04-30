package com.example.config;

import java.io.IOException;

public interface KubernetesConfigService {
    void configureKubernetesAccess() throws IOException;
}
