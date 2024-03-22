package com.example.main.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.main.entity.UserInput;
import com.example.main.repository.UserInputerRepository;

@Service
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/myfoodcom")
public class UserInputerService {

    @Autowired
    private UserInputerRepository userInputRepository;

    @Transactional
    @PostMapping("/api/myfoodcom") // Updated endpoint path
    public ResponseEntity<String> addComment(
            @RequestParam("photo") MultipartFile photoFile,
            @RequestParam("comment") String comment,
            @RequestParam("location") String location,
            @RequestParam("selectedCookingDay") String selectedCookingDay, // Updated parameter name
            @RequestParam("cookingTime") String cookingTimeStr) {

        try {
            // Convert the string representation of time to a Time object
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm");
            Time cookingTime = new Time(sdf.parse(cookingTimeStr).getTime());

            // Save the uploaded file to a directory on the server
            String fileName = UUID.randomUUID().toString() + "_" + photoFile.getOriginalFilename();
            Path filePath = Paths.get("/path/to/upload/directory", fileName);
            Files.copy(photoFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Create a new UserInput object
            UserInput userInput = new UserInput("Sample comment", "sample.jpg", "Location", "Monday", Time.valueOf("12:00:00"));
            userInput.setComment(comment);
            userInput.setLocation(location);
            userInput.setSelectedCookingDay(selectedCookingDay);
            userInput.setCookingTime(cookingTime);
            userInput.setPhoto(fileName);

            // Save the userInput object to the database
            userInputRepository.save(userInput);

            return ResponseEntity.ok("Comment added successfully");
        } catch (ParseException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error parsing cooking time");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading photo");
        }
    }
}
