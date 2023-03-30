package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import io.cucumber.java.BeforeAll;

import static org.junit.jupiter.api.Assertions.assertTrue;



public class MyStepdefs {
    private static final String ROOT_URL = "http://localhost:8080/";

    private  WebDriver driver ;

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

    //I am on the search page
    @Given("I am on the search page now")
    public void iAmOnTheSearchPage() {
        driver.get(ROOT_URL + "search");

    }

    @When("I enter {string} now")
    public void iEnter(String arg0) {
        driver.findElement(By.id("searchField")).sendKeys(arg0);
        
    }

    @And("I press the submit button now")
    public void iPressTheSubmitButton() {
        driver.findElement(By.xpath("//*[@id=\"search\"]/form/button")).click();

    }
    @Then("I should see {string} in the page now")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @Then("I should see {string} {string} {string} {string} {string} {string} in the details page")
    public void iShouldSeeInTheDetailsPage(String arg0, String arg1, String arg2, String arg3, String arg4, String arg5) {
        assertTrue(driver.getPageSource().contains(arg0));
        assertTrue(driver.getPageSource().contains(arg1));
        assertTrue(driver.getPageSource().contains(arg2));
        assertTrue(driver.getPageSource().contains(arg3));
        assertTrue(driver.getPageSource().contains(arg4));
        assertTrue(driver.getPageSource().contains(arg5));
    }
    @After
    public void after() {
        driver.quit();
    }

}
