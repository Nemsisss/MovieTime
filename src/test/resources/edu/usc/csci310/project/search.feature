Feature: testing out the various parts of the Search page
  Scenario: open page and enter a movie search and then click the submit button
    Given I am on the search page
    When I type "Shrek"
    And I press submit button
    Then I should see movie "Shrek" in the page
  Scenario: open search page and enter enter movie search and submit
    Given I am on the search page
    When I type "Titanic"
    And I press submit button
    Then I should see movie "Titanic" in the page
