package com.datn.api.repository;

import com.datn.api.model.Posts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface PostsRepository extends MongoRepository<Posts, String> {
    List<Posts> findByUserId(String userId);
    Page<Posts> findAllByOrderByDateDesc(Pageable pageable);
    Page<Posts> findAllByOrderByUserIdDescDateDesc(Pageable pageable);
    List<Posts> findPostsByUserIdIsEmpty();
    List<Posts> findPostsByUserIdNull();
    List<Posts> findPostsByUserIdNotNull();
    Page<Posts> findPostsByTitleLike(String title, Pageable pageable);
    Page<Posts> findPostsByTitleLikeOrderByDateDesc(String title, Pageable pageable);
}
