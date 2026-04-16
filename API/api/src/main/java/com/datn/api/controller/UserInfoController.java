package com.datn.api.controller;


import com.datn.api.facade.ProductFacade;
import com.datn.api.model.UserInfo;

import com.datn.api.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RestController
public class UserInfoController {

    @Autowired
    private ProductFacade productFacade;

    private final UserInfoRepository userInfoRepository;
    public UserInfoController(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }



    @GetMapping("/userInfo/findAll")
    public ResponseEntity<List<UserInfo>> getAllUsers() {

        return ResponseEntity.ok(this.userInfoRepository.findAll());
    }

    @PostMapping("/userInfo/create")
//    public ResponseEntity<Posts> createUser(@RequestBody PostsDto.RequestDto requestDto) {
    public ResponseEntity<UserInfo> createUser(@RequestBody UserInfo userInfo) {
//        User user = new User();
//        user.setUserName(requestDto.getUserName());
//        user.setPassWord(requestDto.getPassWord());
//        user.setRole(requestDto.getRole());

        return ResponseEntity.status(201).body(this.userInfoRepository.save(userInfo));
    }

    @PostMapping("/userInfo/update")
    public ResponseEntity updateUser(@RequestBody UserInfo userInfo) {

//        Optional<Posts> entity = this.postsRepository.findById(requestDto.getId());
//        if(entity.isPresent()) {

//            user.get().setUserName(requestDto.getUserName());
//            user.get().setPassWord(requestDto.getPassWord());
//            System.out.println("userTest1 - " + user.get().getUserName() +user.get().getPassWord());
        this.userInfoRepository.save(userInfo);
        Optional<UserInfo> entity = this.userInfoRepository.findById(userInfo.getId());
        if(entity.isPresent()) {
            return ResponseEntity.ok(entity.get());
        }
        return ResponseEntity.ok("The posts  was not update.");


    }

    @GetMapping("/userInfo/find/{userInfoId}")
    public ResponseEntity getUserById(@PathVariable String userInfoId) {

        Optional<UserInfo> userInfo = this.userInfoRepository.findById(userInfoId);

        if(userInfo.isPresent()) {
            return ResponseEntity.ok(userInfo.get());
        } else {
            return ResponseEntity.ok("The posts with id: " + userInfoId + " was not found.");
        }
    }

    @GetMapping("/userInfo/delete/{userInfoId}")
    public ResponseEntity getUserById1(@PathVariable String userInfoId) {

        Optional<UserInfo> userInfo = this.userInfoRepository.findById(userInfoId);

        if(userInfo.isPresent()) {
            this.userInfoRepository.deleteById(userInfoId);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The posts with id: " + userInfoId + " was not delete.");
        }
    }
}
