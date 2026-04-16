package com.datn.api.controller;

import com.datn.api.dto.RegisterDto;
import com.datn.api.dto.UserDto;
import com.datn.api.dto.UserInfoDto;
import com.datn.api.facade.UserFacade;
import com.datn.api.model.User;
import com.datn.api.model.UserInfo;
import com.datn.api.repository.UserInfoRepository;
import com.datn.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserFacade userFacade;

    private final UserRepository userRepository;

    private final UserInfoRepository userInfoRepository;
    public UserController(UserRepository userRepository, UserInfoRepository userInfoRepository) {
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }
    @PostMapping("loginAdmin")
    public ResponseEntity login1(@RequestBody UserDto.RequestDto requestDto) {

        User user = userFacade.userQueryByUserName(requestDto.getEmail());
        if(user==null )
//            return ResponseEntity.ok("user or password fail");
            return new ResponseEntity<>("phone or password fail" , HttpStatus.NO_CONTENT);
        if(user.getEmail().equals(requestDto.getEmail())&&user.getPassWord().equals(requestDto.getPassWord()))
            return ResponseEntity.ok(user);
        return new ResponseEntity<>("phone or password fail" , HttpStatus.NO_CONTENT);
    }

    @PostMapping("auth/login")
    public ResponseEntity login(@RequestBody UserDto.RequestDto requestDto) {

        User user = userFacade.userQueryByUserName(requestDto.getEmail());
            RegisterDto.ResponseDto res = new RegisterDto.ResponseDto();
        if(user==null )
//            return ResponseEntity.ok("user or password fail");
            return new ResponseEntity<>("phone or password fail" , HttpStatus.NO_CONTENT);
        if(user.getEmail().equals(requestDto.getEmail())&&user.getPassWord().equals(requestDto.getPassWord()))
        {

            res.setId(user.getId());
            res.setPhone(user.getEmail());
            res.setPassWord(user.getPassWord());
            res.setRole(user.getRole());

            Optional<UserInfo> userInfo = this.userInfoRepository.findById(user.getId());

            if(userInfo.isPresent()) {
                res.setEmail(userInfo.get().getEmail());
                res.setFirstName(userInfo.get().getFirstName());
                res.setLastName(userInfo.get().getLastName());
                res.setLocation(userInfo.get().getLocation());
                res.setPhone(userInfo.get().getPhone());
                res.setCitizenIdentification(userInfo.get().getCitizenIdentification());
            } else {
                return ResponseEntity.ok("The posts with id: " + userInfo + " was not found.");
            }
            return ResponseEntity.ok(res);
        }

        return new ResponseEntity<>("phone or password fail" , HttpStatus.NO_CONTENT);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterDto.ResponseDto> register(@RequestBody RegisterDto.RequestDto requestDto) {

        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassWord(requestDto.getPassWord());
        user.setRole(requestDto.getRole());
        User newUser = userRepository.save(user);

        UserInfo userInfo = new UserInfo();
        userInfo.setId(newUser.getId());
        userInfo.setEmail(newUser.getEmail());
        userInfo.setPhone(requestDto.getPhone());
        userInfo.setLocation(requestDto.getLocation());
        UserInfo newUserInfo = userInfoRepository.save(userInfo);

        RegisterDto.ResponseDto res = new RegisterDto.ResponseDto();
        res.setId(newUser.getId());
        res.setEmail(newUser.getEmail());
        res.setPassWord(newUser.getPassWord());
        res.setRole(newUser.getRole());

        res.setFirstName(newUserInfo.getFirstName());
        res.setLastName(newUserInfo.getLastName());
        res.setLocation(newUserInfo.getLocation());
        res.setPhone(newUserInfo.getPhone());
        res.setCitizenIdentification(newUserInfo.getCitizenIdentification());

        return ResponseEntity.status(201).body(res);
    }

    @PostMapping("auth/registerUser")
    public ResponseEntity<RegisterDto.ResponseDto> registerUser(@RequestBody RegisterDto.RequestDto requestDto) {

        User user = new User();
        user.setEmail(requestDto.getPhone());
        user.setPassWord(requestDto.getPassWord());
        user.setRole(requestDto.getRole());
        User newUser = userRepository.save(user);

        UserInfo userInfo = new UserInfo();
        userInfo.setId(newUser.getId());
        userInfo.setEmail(newUser.getEmail());
        userInfo.setPhone(requestDto.getPhone());
        userInfo.setLocation(requestDto.getLocation());
        userInfo.setCitizenIdentification(requestDto.getCitizenIdentification());
        userInfo.setFirstName(requestDto.getFirstName());
        userInfo.setLastName(requestDto.getLastName());
        UserInfo newUserInfo = userInfoRepository.save(userInfo);
//
        RegisterDto.ResponseDto res = new RegisterDto.ResponseDto();
        res.setId(newUser.getId());
        res.setEmail(requestDto.getEmail());
        res.setPassWord(newUser.getPassWord());
        res.setRole(newUser.getRole());

        res.setFirstName(newUserInfo.getFirstName());
        res.setLastName(newUserInfo.getLastName());
        res.setLocation(newUserInfo.getLocation());
        res.setPhone(newUserInfo.getPhone());
        res.setCitizenIdentification(newUserInfo.getCitizenIdentification());

        return ResponseEntity.status(201).body(res);
    }
    @GetMapping("/user/findAll")
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/user/findAll1")
    public ResponseEntity<Page<User>> getAllUsers1(int limit, int page ) {
        Pageable pageable = PageRequest.of(limit, page);
        Page<User> pages = userRepository.findAll(pageable);

        return ResponseEntity.ok(pages);
    }

    @GetMapping("/user/findAllAdmin")
    public ResponseEntity<List<User>> getAllUsersAdmin() {

        return ResponseEntity.ok(userRepository.findUserByRole("admin"));
    }

    @PostMapping("/user/create")
    public ResponseEntity<User> createUser(@RequestBody UserDto.RequestDto requestDto) {

        User user = new User();
        user.setEmail(requestDto.getEmail());
        user.setPassWord(requestDto.getPassWord());
        user.setRole(requestDto.getRole());

        return ResponseEntity.status(201).body(userRepository.save(user));
    }

    @PostMapping("/user/update")
    public ResponseEntity updateUser(@RequestBody UserDto.RequestDto requestDto) {

        Optional<User> user = userRepository.findById(requestDto.getId());
        if(user.isPresent()) {
            user.get().setEmail(requestDto.getEmail());
            user.get().setPassWord(requestDto.getPassWord());
            userRepository.save(user.get());
//            Optional<User> entity = userRepository.findById(requestDto.getId());

            return ResponseEntity.ok(userRepository.save(user.get()));
        } else {
            return ResponseEntity.ok("The product with id: " + requestDto.getId() + " was not found.");
        }

    }

//    @PostMapping("/user/updateUserInfo")
//    public ResponseEntity updateUserInfo(@RequestBody UserDto.RequestUpdateDto requestDto) {
//
//        Optional<User> user = userRepository.findById(requestDto.getId());
//        if(user.isPresent()) {
////            System.out.println("userTest" + requestDto.getEmail() +requestDto.getPassWord());
//            user.get().setEmail(requestDto.getEmail());
//            user.get().setPassWord(requestDto.getPassWord());
//            userRepository.save(user.get());
//            Optional<User> entity = userRepository.findById(requestDto.getId());
//
//
//        } else {
//            return ResponseEntity.ok("The product with id: " + requestDto.getId() + " was not found.");
//        }
//        Optional<UserInfo> userInfo = userInfoRepository.findById(requestDto.getId());
//        if(userInfo.isPresent()) {
//            userInfo.get().setFirstName(requestDto.getFirstName());
//            userInfo.get().setLastName(requestDto.getLastName());
//            userInfo.get().setPhone(requestDto.getPhone());
//            userInfo.get().setLocation(requestDto.getLocation());
//            userInfo.get().setCitizenIdentification(requestDto.getCitizenIdentification());
//            userInfo.get().setEmail(requestDto.getEmail());
//        }
//
//
//    }

    @GetMapping("/user/find/{userId}")
    public ResponseEntity getUserById(@PathVariable String userId) {

        Optional<User> user = this.userRepository.findById(userId);

        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.ok("The product with id: " + userId + " was not found.");
        }
    }
    @GetMapping("/user/delete/{userId}")
    public ResponseEntity getUserById1(@PathVariable String userId) {

        Optional<User> user = this.userRepository.findById(userId);

        if(user.isPresent()) {
            this.userRepository.deleteById(userId);
            return ResponseEntity.ok("Success.");
        } else {
            return ResponseEntity.ok("The user with id: " + userId + " was not delete.");
        }
    }

}
