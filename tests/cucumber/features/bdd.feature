Feature: Launches

  Background:
    Given User navigates to Login page
    When User logs in with valid credentials
    Then 'Add dashboard' button is displayed
    And User selects project 'process.env.PROJECT_NAME' on dashboard page

  Scenario Outline: Data Driven test for Launches filter (Scenario Outline approach)
    Then Verify Launches contain "<filterName>" filter

    Examples:
      | filterName   |
      | Total        |
      | Failed       |
      | Passed       |
      | Product bug  |
      | Skipped      |
      | Auto bug     |
      | System Issue |

  Scenario: Data Driven test for Launches filter (DataTable)
    Then Verify Launches contain filters
      | Total | Failed | Passed | Product bug | Skipped | Auto bug | System Issue |