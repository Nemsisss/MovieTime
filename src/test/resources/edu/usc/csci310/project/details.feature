Feature: testing out the various parts of the Details page
  Scenario: Display movie details
    Given I am on the details page
    Then I should see "Title" "Release Date" "Plot" "Genres" "Directors" "Cast" in the details page
