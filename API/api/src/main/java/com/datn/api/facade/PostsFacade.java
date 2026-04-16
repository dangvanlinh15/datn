package com.datn.api.facade;

import com.datn.api.model.Posts;

import java.util.List;

public interface PostsFacade {
    public List<Posts> postsQueryByUserId(String userId);
}
