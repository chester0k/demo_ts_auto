Feature: Login to Test Application

  Background:
    Given User navigates to Login page

  Scenario: Invalid Password
    When User logs in with 'ysydorenko' login and password 'wrongPass'
    Then 'Add dashboard' button is not displayed

  Scenario: Valid login
    When User logs in with valid credentials
    Then 'Add dashboard' button is displayed
    When User selects project 'process.env.PROJECT_NAME' on dashboard page
    And User clicks on dashboard 'DEMO DASHBOARD'
    Then Opened dashboard is displayed with title 'DEMO DASHBOARD'