
import io.cucumber.java.After;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.*;


public class MyStepdefs {
    private static final String ROOT_URL = "http://localhost:8080/";
    private final WebDriver driver = new ChromeDriver();
    //I am on the search page
    @Given("I am on the search page")
    public void iAmOnTheSearchPage() {
        driver.get(ROOT_URL + "search");

    }

    @When("I enter {string}")
    public void iEnter(String arg0) {
        driver.findElement(By.id("searchField")).sendKeys(arg0);
        
    }

    @And("I press the submit button")
    public void iPressTheSubmitButton() {
        driver.findElement(By.xpath("//*[@id=\"search\"]/form/button")).click();

    }
    @Then("I should see {string} in the page")
    public void iShouldSeeInThePage(String arg0) {
        assertTrue(driver.getPageSource().contains(arg0));
    }

    @After
    public void after() {
        driver.quit();
    }


}
