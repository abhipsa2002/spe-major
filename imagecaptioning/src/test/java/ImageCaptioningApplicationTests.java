import com.spe.imagecaptioning.DTO.LoginDTO;
import com.spe.imagecaptioning.ImageCaptioningApplication;
import com.spe.imagecaptioning.Service.UserService;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(classes = ImageCaptioningApplication.class)
public class ImageCaptioningApplicationTests {

    @Autowired
    UserService userService;

    @Test
    void contextLoads() {
    }
    @BeforeAll
    static void testInit(){
        System.out.println(" TESTING STARTED");
    }

    @Test
    public void testNoUser() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("user1@gmail.com");
        loginDTO.setPassword("Test123");
        assertFalse(userService.verifyUser(loginDTO), "Expected no user found");
    }

    @Test
    public void testNegativeLoginDetails() {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("rishitha1201@gmail.com");
        loginDTO.setPassword("123");
        assertFalse(userService.verifyUser(loginDTO), "Expected login to fail");
    }

//    @Test
//    public void testPositiveLoginDetails() {
//        LoginDTO loginDTO = new LoginDTO();
//        loginDTO.setEmail("rishitha1201@gmail.com");
//        loginDTO.setPassword("Rishi@2001");
//        assertTrue(userService.verifyUser(loginDTO), "Login Success");
//    }

    @AfterAll
    static void testComplete(){
        System.out.println("TESTING ENDED");
    }
}
