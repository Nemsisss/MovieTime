Feature: testing out the various parts of the Search page
  Scenario: open the page and enter enter a movie search query and click the submit button
    Given I am on the search page
    When I enter query "Shrek"
    And I hit submit
    Then I should see "Shrek" in the search page
  Scenario: open the page and enter enter a movie search query and click the submit button
    Given I am on the search page
    When I enter query "Titanic"
    And I hit submit
    Then I should see "Titanic" in the search page
