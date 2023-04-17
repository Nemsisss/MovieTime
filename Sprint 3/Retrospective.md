Members Present: Anglea, Daniel, Nemsiss, Sohee, Roza

Summary of retrospective discussion, no more than 500 words that accounts for all feedback given in the grade report and sprint review. Discussion may be written as prose or as a bulleted list. For each feedback, answer one of the two questions.
 i. What process aspects will be changed? Explain why this will address the problem. 
ii. What tasks will be added to the product backlog as a result of review feedback?

Feedback
We need to add hover effects for a movie details page
Create an “add” button to add the movie to a movie list
Make the “add to list” feature responsive for mobile mode, by having an add button instead of hovering when the app is used in mobile mode.
Add a navbar with “logout”, ”team number” and “Movie time” logo, besides having links to navigate to other pages
Have a minus symbol to delete movies
Have a Move symbol that can move the list to another page
Have a Copy symbol that can copy a movie to another list


We need to fix some issues on the search page, specifically:
Add an error message to display if the entered list name already exists
Add a navbar with “logout” ,” team number” and “Movie time” logo, besides having links to navigate to other pages
Add an eye icon to show which list a movie is already in (if the movie is already added to a list, by clicking the eye icon, the user should be able to see which lists already have that specific movie added to them)
Add a $ icon to take the user to a website to buy movie tickets for that movie
Add an image placeholder for movies that don’t have an image
Fix some minor bugs regarding load more when directed from the details page, creating a new list (fix so that the the newly created list appears on the dropdown of the lists without the user having to refresh the page), fix the url for getting the actors and etc.
Start working on comparison page between movies and recommendation page for movies
Add timeout feature to all pages with 60 seconds of inactivity
We will work on this to redirect the user to the login page after 60 seconds of no activity
Add security to login page after too many login attempts
If a user attempts an incorrect login 3 times in a row, timeout the page
If a user attempts a login, waits 30 seconds, then tries again, reset the counter.
Change is so that passwords in the database are encrypted. In order to do this, you be encode/decode the password when putting it in the databse/checking the password for login
Ensure that “inner” pages can only be accessed after you login. This means that if a user tries to just enter “/search” or another page outside of login and signup, they will be redirected to login so they cannot see/access the page
Add UI requirements
Add appname “Movie Time” on the top of the login page
Add appname on the header of all pages, including the signup page
Add team number to header or footer 
Make sure the design/color theme is consistent
