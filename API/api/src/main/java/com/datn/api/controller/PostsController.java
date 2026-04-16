package com.datn.api.controller;

import com.datn.api.dto.PageDto;
import com.datn.api.dto.SearchDto;
import com.datn.api.facade.PostsFacade;
import com.datn.api.model.Posts;
import com.datn.api.model.User;
import com.datn.api.repository.PostsRepository;
import com.datn.api.service.PostsSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class PostsController {

    @Autowired
    private PostsFacade postsFacade;
    @Autowired
    private PostsSearchService postsSearchService;
    private final PostsRepository postsRepository;
    public PostsController(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }
    @GetMapping("/posts/findAll")
    public ResponseEntity<List<Posts>> getAllUsers() {

        return ResponseEntity.ok(this.postsRepository.findAll());
    }

    @PostMapping("/posts/findPage")
    public ResponseEntity<Page<Posts>> getFindPage(@RequestBody PageDto requestDto) {

        Pageable pageable = PageRequest.of(requestDto.getPage() , requestDto.getLimit());
        Page<Posts> pages = postsRepository.findAllByOrderByUserIdDescDateDesc(pageable);
                return ResponseEntity.ok(pages);
    }
//    @PostMapping("/posts/findPage")
//    public ResponseEntity<Page<Posts>> getSearch(@RequestBody PageDto requestDto) {
//
//        Pageable pageable = PageRequest.of(requestDto.getPage() , requestDto.getLimit());
//        Page<Posts> pages = postsRepository.findByTitleAndPriceAndProvince(pageable);
//        return ResponseEntity.ok(pages);
//    }

    @PostMapping("/posts/findByTitle")
    public ResponseEntity<Page<Posts>> findByTitle(@RequestBody SearchDto requestDto) {

        Pageable pageable = PageRequest.of(requestDto.getPage(), requestDto.getLimit());
        Page<Posts> pages = postsRepository.findPostsByTitleLikeOrderByDateDesc(requestDto.getTitle(), pageable);
        return ResponseEntity.ok(pages);
    }

    @PostMapping("/posts/search")
    public ResponseEntity<Page<Posts>> search(@RequestBody SearchDto requestDto) {
        Pageable pageable = PageRequest.of(
                requestDto.getPage(),
                requestDto.getLimit(),
                Sort.by(Sort.Direction.DESC, "date")
        );
        Page<Posts> pages = postsSearchService.search(requestDto, pageable);
        return ResponseEntity.ok(pages);
    }



    @PostMapping("/posts/create")
//    public ResponseEntity<Posts> createUser(@RequestBody PostsDto.RequestDto requestDto) {
    public ResponseEntity<Posts> createUser(@RequestBody Posts posts) {
        return ResponseEntity.status(201).body(this.postsRepository.save(posts));
    }

    @PostMapping("/posts/update")
    public ResponseEntity updateUser(@RequestBody Posts posts) {

//        Optional<Posts> entity = this.postsRepository.findById(requestDto.getId());
//        if(entity.isPresent()) {

//            user.get().setUserName(requestDto.getUserName());
//            user.get().setPassWord(requestDto.getPassWord());
//            System.out.println("userTest1 - " + user.get().getUserName() +user.get().getPassWord());
            this.postsRepository.save(posts);
            Optional<Posts> entity = this.postsRepository.findById(posts.getId());
            if(entity.isPresent()) {
                return ResponseEntity.ok(entity.get());
            }
        return ResponseEntity.ok("The posts  was not update.");
    }

    @GetMapping("/posts/find/{postId}")
    public ResponseEntity getUserById(@PathVariable String postId) {

        Optional<Posts> posts = this.postsRepository.findById(postId);

        if(posts.isPresent()) {
            return ResponseEntity.ok(posts.get());
        } else {
            return ResponseEntity.ok("The posts with id: " + postId + " was not found.");
        }
    }

    @GetMapping("/posts/findByUserId/{userId}")
    public ResponseEntity getUserByUserid(@PathVariable String userId) {

        List<Posts> posts = postsFacade.postsQueryByUserId(userId);
        return ResponseEntity.ok(posts);


    }

    @GetMapping("/posts/findPostsCrawler")
    public ResponseEntity getPostsCrawlAll() {

//        List<Posts> posts = postsRepository.findPostsByUserIdNull();
        List<Posts> posts = postsRepository.findAll();
        return ResponseEntity.ok(posts);


    }
    @GetMapping("/posts/findPostsUser")
    public ResponseEntity getPostsUserAll() {

        List<Posts> posts = postsRepository.findPostsByUserIdNotNull();

        return ResponseEntity.ok(posts);


    }
    @GetMapping("/posts/delete/{postId}")
    public ResponseEntity getUserById1(@PathVariable String postId) {

        Optional<Posts> posts = this.postsRepository.findById(postId);

        if(posts.isPresent()) {
            this.postsRepository.deleteById(postId);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The posts with id: " + postId + " was not delete.");
        }
    }
}
