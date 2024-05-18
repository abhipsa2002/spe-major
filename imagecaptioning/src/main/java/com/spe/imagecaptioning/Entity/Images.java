package com.spe.imagecaptioning.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="image_id")
    private Long imageId;

    @Column(name = "created_date", nullable = false)
    private LocalDate createdAt;

    @Column(name = "caption",nullable = false)
    private String caption;

    @Column(columnDefinition = "MEDIUMTEXT",nullable = false)
    private String image;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id",referencedColumnName = "user_id" ,nullable = false)
    private User user;

    public Images() {
    }

    public Images(Long imageId, LocalDate createdAt, String image, User user, String caption) {
        this.imageId = imageId;
        this.createdAt = createdAt;
        this.image = image;
        this.user = user;
        this.caption = caption;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    @Override
    public String toString() {
        return "Images{" +
                "imageId=" + imageId +
                ", createdAt=" + createdAt +
                ", caption='" + caption + '\'' +
                ", image='" + image + '\'' +
                ", user=" + user +
                '}';
    }
}
