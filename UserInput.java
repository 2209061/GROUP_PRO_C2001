package com.example.main.entity;

import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userinputer")
public class UserInput {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient
    @Column(name = "comment")
    private String comment;

    @Transient
    @Column(name = "photo")
    private String photo;

    @Transient
    @Column(name = "location")
    private String location;

    @Transient
    @Column(name = "selectedCookingDay")
    private String selectedCookingDay;

    @Transient
    @Column(name = "cookingTime")
    private Time cookingTime;

    // Constructors
    public UserInput(String comment, String photo, String location, String selectedCookingDay, Time cookingTime) {
        this.comment = comment;
        this.photo = photo;
        this.location = location;
        this.selectedCookingDay = selectedCookingDay;
        this.cookingTime = cookingTime;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSelectedCookingDay() {
        return selectedCookingDay;
    }

    public void setSelectedCookingDay(String selectedCookingDay) {
        this.selectedCookingDay = selectedCookingDay;
    }

    public Time getCookingTime() {
        return cookingTime;
    }

    public void setCookingTime(Time cookingTime) {
        this.cookingTime = cookingTime;
    }

}
