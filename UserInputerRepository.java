package com.example.main.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.main.entity.UserInput;
@Repository
public interface UserInputerRepository extends JpaRepository<UserInput,Long> {



	    // Add more custom query methods as needed
	}

