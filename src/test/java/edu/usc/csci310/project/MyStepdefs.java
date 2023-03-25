package edu.usc.csci310.project;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.jupiter.api.Assertions.*;


public class MyStepdefs {
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

    //I am on the search page
    @Given("I am on the search page")
    public void iAmOnTheSearchPage() {
        driver.get(ROOT_URL + "search");

    }

    @When("I type {string}")
    public void iType(String arg0) {
        driver.findElement(By.id("searchField")).sendKeys(arg0);
        
    }

    @And("I press submit button")
    public void iPressSubmitButton() {
        driver.findElement(By.xpath("//*[@id=\"search\"]/form/button")).click();

    }
    @Then("I should see movie {string} in the page")
    public void iShouldSeeMovieInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

//    @After
//    public void after() {
//        driver.quit();
//    }


}
