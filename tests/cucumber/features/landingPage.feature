Feature: Landing page with no specific route for the first time

	As a user
	I want to see city picker on a landing page
	So that I can choose my city

	Scenario: Visitors can choose city
      Given I am a new visitor
      When I navigate to the landing page
      Then I see the city picker