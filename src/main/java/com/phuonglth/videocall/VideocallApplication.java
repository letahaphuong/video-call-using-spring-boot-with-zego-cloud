package com.phuonglth.videocall;

import com.phuonglth.videocall.user.User;
import com.phuonglth.videocall.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VideocallApplication {

    public static void main(String[] args) {
        SpringApplication.run(VideocallApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(UserService userService) {
        return args -> {
            userService.register(User.builder()
                    .email("ali@gmail.com")
                    .username("Ali")
                    .password("aaa")
                    .build());

            userService.register(User.builder()
                    .email("join@gmail.com")
                    .username("Join")
                    .password("aaa")
                    .build());

            userService.register(User.builder()
                    .email("anny@gmail.com")
                    .username("Anny")
                    .password("aaa")
                    .build());
        };
    }
}
