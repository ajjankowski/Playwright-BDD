Feature: Login functionality

  Scenario: User cannot log in with incorrect data
    Given I navigate to the login page
    When I try to login with incorrect data
    Then I should see incorrect login data error

  Scenario: User can log in and log out with correct data
    Given I navigate to the login page
    When I login with correct data
    Then I should see the website dashboard
    And I log out
    Then I should see the login header

  Scenario: User can explore about the app section
    Given I navigate to the login page
    When I open About the App subpage
    Then I should see the Getting Started panel
    And I should see the Puppy Bank Features panel
    And I should see the About Puppy Bank panel
    And I should see the Why It Was Made panel
    And I should see the Sources panel
    And I quit from About the App subpage
    Then I should see the login header
