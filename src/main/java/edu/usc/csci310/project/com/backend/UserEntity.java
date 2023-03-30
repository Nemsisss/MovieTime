package edu.usc.csci310.project.com.backend;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
//mark class as an Entity
//defining class name as Table name
@Entity
@Table(name = "app_users")
public class UserEntity
{
    //mark id as primary key
    @Id
//defining id as column name
    @Column
    private int id;
    //defining name as column name
    @Column(unique = true)
    private String email;
    //defining age as column name
    @Column
    private String password;
    //defining email as column name
    public int getId()
    {
        return id;
    }
    public void setId(int id)
    {
        this.id = id;
    }
    public String getPassword()
    {
        return password;
    }
    public void setPassword(String password)
    {
        this.password = password;
    }
    public String getEmail()
    {
        return email;
    }
    public void setEmail(String email)
    {
        this.email = email;
    }
}