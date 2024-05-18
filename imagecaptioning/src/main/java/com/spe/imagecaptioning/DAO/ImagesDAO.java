package com.spe.imagecaptioning.DAO;

import com.spe.imagecaptioning.Entity.Images;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImagesDAO extends JpaRepository<Images,Long> {

    @Query("select i from Images i where i.user.userId=?1")
    List<Images> findAllByUserId(Long userId);
}
