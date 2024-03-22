package com.example.main;

import javax.sql.DataSource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MyFoodcomApplication {

    public static void main(String[] args) {
        SpringApplication.run(MyFoodcomApplication.class, args);
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:mysql:localhost://localhost:3306/myfoodcom") // Change the URL as per your MySQL configuration
                .username("root") // Change the username if it's different
                .password("") // Add the password here
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
