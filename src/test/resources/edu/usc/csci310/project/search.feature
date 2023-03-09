Feature: Search

  Scenario: enter a movie search query and click the submit button
    When user submits a search query
    Then the server should handle it and return a success status

  Scenario: Data retrieval from a web service
    When user wants to see the search result
    Then movie search result is displayed

