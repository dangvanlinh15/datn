package com.datn.api.facade;
import com.datn.api.model.User;
public interface UserFacade {
    public  User userQueryByUserName(String userName);
}
