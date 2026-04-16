package com.datn.api.facade;

import com.datn.api.model.User;
import com.datn.api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFacadeImpl implements UserFacade {
    private final UserRepository userRepository;
    public UserFacadeImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public  User userQueryByUserName(String email) {
        try {
            List<User> userList = this.userRepository.findByEmail(email);
            if(!userList.isEmpty()&& userList.get(0) !=null ) {
                return userList.get(0);
            }
        } catch (Exception e) {
            throw e;
        }

        return null;
    }
}
