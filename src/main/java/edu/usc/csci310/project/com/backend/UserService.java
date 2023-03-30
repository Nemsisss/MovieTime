package edu.usc.csci310.project.com.backend;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;
    public UserEntity saveOrUpdate(UserEntity s)
    {
        return userRepository.save(s);
    }

//    public UserEntity attemptLogin(UserEntity user){
//        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
//    }

    public UserEntity getByEmail(String email){
        return userRepository.findByEmail(email);
    }
}

//deleting a specific record
//    public void delete(int id)
//    {
//        userRepository.deleteById(id);
//    }
//    public UserEntity addUser(UserEntity s) {
//        return userRepository.save(s);
//    }
//getting all student records
//    public List<UserEntity> getAllStudent()
//    {
//        List<UserEntity> users = new ArrayList<UserEntity>();
//        userRepository.findAll().forEach(student -> users.add(student));
//        return users;
//    }
//    //getting a specific record
//    public UserEntity getById(int id)
//    {
//        return userRepository.findById(id).get();
//    }