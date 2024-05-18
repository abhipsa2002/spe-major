package com.spe.imagecaptioning.Controller;

import com.spe.imagecaptioning.DTO.LoginDTO;
import com.spe.imagecaptioning.Entity.Images;
import com.spe.imagecaptioning.Entity.User;
import com.spe.imagecaptioning.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;


    private static final Logger logger = LogManager.getLogger(UserController.class);

    @PostMapping("/login")
    public ResponseEntity<?> userLogin(@RequestBody LoginDTO credentials) {
        logger.info("Login end-point called");
        try {
            Boolean loginResponse=userService.verifyUser(credentials);
            logger.info("Login response sent successfully");
            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to login");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> userRegistration(@RequestBody User user) {
        logger.info("Register end-point called");
        try {
            User newUser=userService.registerUser(user);
            logger.info("Register response sent successfully");
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to register user");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @GetMapping("/getPastImageCaptions/{email}")
    public ResponseEntity<?> pastImages(@PathVariable String email) {
        logger.info("Get past images end-point called");
        try {
            List<Images> pastImages=userService.pastImages(email);
            logger.info("Get past images response sent successfully");
            return ResponseEntity.ok(pastImages);
        } catch (Exception e) {
            logger.error("Failed to get past images");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/generateCaption/{email}")
    public ResponseEntity<String> generateCaption(@RequestBody Images image,@PathVariable String email) {
        logger.info("Generate caption end-point called");
        try {
            String generatedCaption=userService.generateCaption(image,email);
            logger.info("Generate caption response sent successfully");
            return ResponseEntity.ok(generatedCaption);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("Failed to generate caption");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}
