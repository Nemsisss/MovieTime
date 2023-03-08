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

public class SignUpStepDef {
    private static final String ROOT_URL = "http://localhost:8080/";
    private final WebDriver driver = new ChromeDriver();

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

//    @After
//    public void after() {
//        driver.quit();
//    }
}
