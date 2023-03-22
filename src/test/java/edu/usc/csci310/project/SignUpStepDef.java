package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.List;

public class SignUpStepDef {

    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

    @BeforeAll
    public static void beforeAll() {
        System.out.println("Setting Up Cucumber Driver");
        WebDriverManager.chromedriver().setup();
    }

    @Before
    public void before() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @Given("I am on the signup page")
    public void iAmOnTheSignupPage() {
        driver.get(ROOT_URL+"signUp");
    }

    @When("I enter {string}")
    public void iEnter(String arg0) {
        driver.findElement(By.id("email")).sendKeys(arg0);
    }

    @And("I enter {string} in both fields")
    public void iEnterInBothFields(String arg0) {
        driver.findElement(By.id("password")).sendKeys(arg0);
        driver.findElement(By.id("passwordCheck")).sendKeys(arg0);
    }

    @And("I press the submit button")
    public void iPressTheSubmitButton() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/div[3]/form/button")).click();
    }

    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @And("I enter {string} in first field")
    public void iEnterInFirstField(String arg0) {
        driver.findElement(By.id("password")).sendKeys(arg0);
    }

    @And("I enter {string} in the second field")
    public void iEnterInTheSecondField(String arg0) {
        driver.findElement(By.id("passwordCheck")).sendKeys(arg0);
    }

    @When("I am on the login page")
    public void iAmOnTheLoginPage() {
        driver.get(ROOT_URL + "login");
    }

    @When("I enter {string} in email field")
    public void iEnterInEmailField(String arg0) {
        driver.findElement(By.id("email")).sendKeys(arg0);
    }

    @And("I enter {string} in password field")
    public void iEnterInPasswordField(String arg0) {
        driver.findElement(By.id("password")).sendKeys(arg0);
    }
}
