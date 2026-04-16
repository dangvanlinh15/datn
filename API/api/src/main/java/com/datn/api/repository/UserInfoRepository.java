package com.datn.api.repository;

import com.datn.api.model.ConfigCrawler;
import com.datn.api.model.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {
}
