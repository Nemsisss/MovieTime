Feature: testing out the various parts of the Search page
  Scenario: open page and enter a movie search and then click the submit button
    Given I am on the search page now
    When I enter "Shrek" now
    And I press the submit button now
    Then I should see "Shrek" in the page now
  Scenario: open search page and enter enter movie search and submit
    Given I am on the search page now
    When I enter "Titanic" now
    And I press the submit button now
    Then I should see "Titanic" in the page now
