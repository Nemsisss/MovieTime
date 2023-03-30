package edu.usc.csci310.project.com.backend;

import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserServiceTest {

    UserService us = new UserService();
    @Test
    void saveOrUpdate() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.save(user)).thenReturn(user);
        UserEntity te = us.saveOrUpdate(user);
        assertEquals(te, user);
    }

    @Test
    void getByEmail() {
        UserRepository rp = mock(UserRepository.class);
        UserEntity user = new UserEntity();
        user.setEmail("test@email.com");
        ReflectionTestUtils.setField(us, "userRepository", rp);
        when(rp.findByEmail(user.getEmail())).thenReturn(user);
        UserEntity te = us.getByEmail("test@email.com");
        assertEquals(te, user);
    }
}