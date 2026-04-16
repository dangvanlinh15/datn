package com.datn.api.repository;

import com.datn.api.model.ConfigCrawler;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigCrawlerRepository extends MongoRepository<ConfigCrawler, String> {
}
