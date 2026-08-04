package com.rankquest.service;

import com.rankquest.model.Resource;
import com.rankquest.repository.ResourceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ResourceService {

    private final ResourceRepository resourceRepository;

    public ResourceService(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public List<Resource> getResourcesByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return getAllResources();
        }
        return resourceRepository.findByCategory(category);
    }
}
