package com.spe.imagecaptioning;

import com.spe.imagecaptioning.Controller.UserController;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class ImageCaptioningApplication {

	private static final Logger logger = LogManager.getLogger(UserController.class);

	public static void main(String[] args) {
		SpringApplication.run(ImageCaptioningApplication.class, args);
		logger.info("Image captioning application started");
	}

}
