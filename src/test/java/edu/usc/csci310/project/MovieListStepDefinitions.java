package edu.usc.csci310.project;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class MovieListStepDefinitions {

    private static final String ROOT_URL = "http://localhost:8080/";
    private WebDriver driver;

//    @BeforeAll
//    public static void beforeAll() {
//        System.out.println("Setting Up Cucumber Driver");
//        WebDriverManager.chromedriver().setup();
//    }

    @Before
    public void before() {
        System.out.println("Setting Up Cucumber Driver");
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    @Given("I navigate to the endpoint {string}")
    public void iNavigateToTheEndpoint(String arg0) {
        driver.get(ROOT_URL + arg0);
    }

    @When("I click on the next button")
    public void iClickOnTheNextButton() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div[3]")).click();
    }

    @Then("I should see movie {string}")
    public void iShouldSeeMovie(String arg0) {
        assertEquals(arg0, driver.findElement(By.className("movie-name")).getText());
    }

    @When("I click on the previous button")
    public void iClickOnThePreviousButton() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div[2]")).click();
    }

//    @When("I click on the second carosol button")
//    public void iClickOnTheSecondCarosolButton() {
//        driver.findElement(By.className("1")).click();
//    }

    @When("I click on the previous button twice")
    public void iClickOnThePreviousButtonTwice() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div[2]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div[2]")).click();
    }

    @When("I click on the next button twice")
    public void iClickOnTheNextButtonTwice() {
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div[3]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div[2]/div/div[3]")).click();
    }
    @After
    public void after() {
        driver.quit();
    }

}
