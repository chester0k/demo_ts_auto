Feature: Behaviour of two users

  Background:
    Given First user navigates to Login page
    And Second user navigates to Login page

  @two_users
  Scenario: Add widget by one user verify by another
    When First user logs in with valid credentials
    And Second user logs in with valid credentials
    When First User selects project 'process.env.PROJECT_NAME' on dashboard page
    And First User clicks on dashboard 'DEMO DASHBOARD'
    And First User clicks Add New Widget button
    And First User selects widget type "Launch statistics chart"
    And First User clicks Widget Next button
    And First User selects configuration widget filter "DEMO_FILTER"
    And First User clicks Widget Next button
    And First User enters widget name "DEMO WIDGET"
    And First User clicks Add widget button
    When Second User selects project 'process.env.PROJECT_NAME' on dashboard page
    And Second User clicks on dashboard 'DEMO DASHBOARD'
    And Widget "widgetName" added by First User is displayed





