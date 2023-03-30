Feature: Movie List
  Scenario: Press next button
    Given I navigate to the endpoint "movie"
    When I click on the next button
    Then I should see movie "Avatar The Way of Water"
  Scenario: Press next button twice.
    Given I navigate to the endpoint "movie"
    When I click on the next button twice
    Then I should see movie "Avatar"
  Scenario: Press the previous button
    Given I navigate to the endpoint "movie"
    When I click on the previous button
    Then I should see movie "Avatar"
  Scenario: Press the previous button twice.
    Given I navigate to the endpoint "movie"
    When I click on the previous button twice
    Then I should see movie "Avatar The Way of Water"
