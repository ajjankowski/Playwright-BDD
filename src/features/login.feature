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

  Scenario Outline: User can explore about the app section
    Given I navigate to the login page
    When I open About the App subpage
    Then I should see the "<Panel_1>" panel
    And I should see the "<Panel_2>" panel
    And I should see the "<Panel_3>" panel
    And I should see the "<Panel_4>" panel
    And I should see the "<Panel_5>" panel
    When I quit from About the App subpage
    Then I should see the login header

    Examples:
      | Panel_1         | Panel_2             | Panel_3          | Panel_4          | Panel_5       |
      | Getting Started | Puppy Bank Features | About Puppy Bank | Why it was made? | Sources       |
      | Error maker     | Error maker 2       | Error maker 3    | Error maker 4    | Error maker 5 |
