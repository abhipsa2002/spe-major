package com.spe.imagecaptioning.Service;

import com.spe.imagecaptioning.DTO.LoginDTO;
import com.spe.imagecaptioning.Entity.Images;
import com.spe.imagecaptioning.Entity.User;

import java.util.List;

public interface UserService {

    Boolean verifyUser(LoginDTO loginDTO);

    User registerUser(User newUser);

    List<Images> pastImages(String email);

    String generateCaption(Images image,String email);
}
