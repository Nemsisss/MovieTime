Feature: testing out the various parts of login page
  Scenario: Login successfully
    Given I am on the login page
    When I enter "valid@email.com" in email field
    And I enter "1234" in password field
    And I press the submit button
    Then I should see "Welcome!" in the page
  Scenario: Login fail
    Given I am on the login page
    When I enter "invalid@email.com" in email field
    And I enter "0000" in password field
    And I press the submit button
    Then I should see "Invalid email or password. Try again." in the page