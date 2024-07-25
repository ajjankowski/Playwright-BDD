Feature: Dashboard Functionality

  Scenario: User can see dashboard elements
    Given I am logged in as an administrator
    Then I should see the deposit panel
    And I should see the withdraw panel
    And I should see the transfer panel
    And I should see the number of transactions panel
    And I should see the cashflow panel
    And I should see the transaction mix panel

  Scenario: User can check puppy account list
    Given I am logged in as an administrator
    When I open the Puppy Accounts subpage
    Then I should see the Puppy Accounts list header
    And I should see the Poodle puppy
    And I should see the Siberian puppy
    And I should see the Golden puppy

  Scenario: User cannot add a puppy account with existing email
    Given I am logged in as an administrator
    When I open the New Puppy Account subpage
    And I fill up new puppy data with existing email
    Then I should see an error message for email already used
