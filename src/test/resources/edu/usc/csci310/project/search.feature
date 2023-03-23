Feature: testing out the various parts of the Search page
  Scenario: open the page and enter enter a movie search query and click the submit button
    Given I am on the search page
    When I enter "Shrek"
    And I press the submit button
    Then I should see "Shrek" in the page
  Scenario: open search page and enter enter movie search and submit
    Given I am on the search page
    When I enter "Titanic"
    And I press the submit button
    Then I should see "Titanic" in the page