package com.spe.imagecaptioning.DAO;

import com.spe.imagecaptioning.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDAO extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
