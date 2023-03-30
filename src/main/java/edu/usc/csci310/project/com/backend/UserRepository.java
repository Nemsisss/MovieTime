package edu.usc.csci310.project.com.backend;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface UserRepository extends CrudRepository<UserEntity, Integer>
{
    UserEntity findByEmail(String email);

    UserEntity findByEmailAndPassword(String email, String password);

}