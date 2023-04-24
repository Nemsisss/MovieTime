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

import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.springframework.boot.test.context.SpringBootTest;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MyStepdefs {
    private static final String ROOT_URL = "http://localhost:8080/";

    private WebDriver driver ;

    @Before
    public void webDriver() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        //options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        options.addArguments("--whitelisted-ips");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-extensions");
        options.addArguments("--remote-allow-origins=*");
        driver = new ChromeDriver(options);
    }

    //I am on the search page
    @Given("I am on the search page now {string}")
    public void iAmOnTheSearchPage(String arg0) {
        driver.get(ROOT_URL+"signUp");
        driver.findElement(By.id("email")).sendKeys(arg0);
        driver.findElement(By.id("password")).sendKeys("Password1!");
        driver.findElement(By.id("passwordCheck")).sendKeys("Password1!");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/form/button")).click();

        Duration duration = Duration.ofSeconds(10);
        WebDriverWait wait = new WebDriverWait(driver, duration);
        By searchFieldLocator = By.id("searchField");
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchFieldLocator));
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

    @Given("I am on the details page")
    public void iAmOnTheDetailsPage() {
        driver.get(ROOT_URL+"signUp");
        driver.findElement(By.id("email")).sendKeys("test3@email.com");
        driver.findElement(By.id("password")).sendKeys("Password1!");
        driver.findElement(By.id("passwordCheck")).sendKeys("Password1!");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div/div/div/div[3]/form/button")).click();

        Duration duration = Duration.ofSeconds(10);
        WebDriverWait wait = new WebDriverWait(driver, duration);
        By searchFieldLocator = By.id("searchField");
        wait.until(ExpectedConditions.visibilityOfElementLocated(searchFieldLocator));
        driver.findElement(searchFieldLocator).sendKeys("Titanic");
        driver.findElement(By.xpath("//*[@id=\"search\"]/form/button")).click();
        By viewDetail = By.id("viewDetails");
        wait.until(ExpectedConditions.visibilityOfElementLocated(viewDetail));
        driver.findElement(By.id("viewDetails")).click();
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
