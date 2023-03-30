package edu.usc.csci310.project.com.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//creating RestController
@RestController
@RequestMapping("/user")
public class UserController
{
    //autowired the StudentService class
    @Autowired
    UserService userService;

    /*@GetMapping("/check")
    private ResponseEntity<UserEntity> checkUserExist(@RequestBody UserEntity user)
    {
        UserEntity existingUser = userService.attemptLogin(user);

        if (existingUser == null) { //did not find someone with that email
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);  //looking at response.status === 417
        }
        userService.saveOrUpdate(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }*/

    @PostMapping("/save")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user) {
        UserEntity existingUser = userService.getByEmail(user.getEmail());

        if (existingUser != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        userService.saveOrUpdate(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}