Feature: testing out the various parts of the Search page
  Scenario: open the page and enter enter a movie search query and click the submit button
    Given I am on the search page
    When I type "Shrek"
    And I press submit button
    Then I should see movie "Shrek" in the page
  Scenario: open the page and enter enter a movie search query and click the submit button
    Given I am on the search page
    When I type "Titanic"
    And I press submit button
    Then I should see movie "Titanic" in the page