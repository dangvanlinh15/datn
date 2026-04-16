package com.datn.api.facade;

import com.datn.api.model.Posts;
import com.datn.api.repository.PostsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostsFacadeImpl implements PostsFacade{
    private final PostsRepository postsRepository;
    public PostsFacadeImpl(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }
    @Override
    public List<Posts> postsQueryByUserId(String userId){
        try {
            List<Posts> postsList = this.postsRepository.findByUserId(userId);
            if(!postsList.isEmpty()) {
                return postsList;
            }
        } catch (Exception e) {
            throw e;
        }

        return null;

    };
}
