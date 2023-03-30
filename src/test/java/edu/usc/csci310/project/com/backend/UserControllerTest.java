package edu.usc.csci310.project.com.backend;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class UserControllerTest {

    UserController uc = new UserController();

    @Test
    public void saveUser_withNewUser_shouldReturnCreated() {
        UserService service = mock(UserService.class);
        ReflectionTestUtils.setField(uc, "userService", service);
        when(service.getByEmail("test@gmail.com")).thenReturn(null);
        UserEntity user = new UserEntity();
        user.setEmail("test@gmail.com");
        user.setPassword("Password1!");

        ResponseEntity<UserEntity> returnedResponse = uc.saveUser(user);

        assertNotNull(returnedResponse.getBody());
        assertEquals(HttpStatus.CREATED, returnedResponse.getStatusCode());
    }

    @Test
    public void saveUser_withExistingUser_shouldReturnConflict() {
        UserService service = mock(UserService.class);
        ReflectionTestUtils.setField(uc, "userService", service);
        UserEntity entity = new UserEntity();
        when(service.getByEmail("test@gmail.com")).thenReturn(entity);
        UserEntity user = new UserEntity();
        user.setEmail("test@gmail.com");
        user.setPassword("Password1!");

        ResponseEntity<UserEntity> returnedResponse = uc.saveUser(user);

        assertEquals(HttpStatus.CONFLICT, returnedResponse.getStatusCode());
    }

}