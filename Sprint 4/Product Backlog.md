1. Search for movies based on various criteria
- Search by keyword, title/ actor/ director, using all the movie details (use keywords)
- Add hover controls that allow users to add movies to their movie lists.
- Provide navigation to the list page.
- Change the genre search functionality to keyword search for greater flexibility
2. Provide movie details
- Title of the movie
- genre of the movie
- the year released
- overview of the plot (limited ?)
- name of the director
- a representative picture associated with the movie
- production studio
- scrollable list of actors appearing in the movie
3. Create and save movie watch lists
4. Compare movie lists with other users
5. Create picture montages based on a list
6. Generate suggestions for new movies
7. Create a user account
8. Works on Chrome browser and mobile devices
9. Be secure and protect users’ data.
10. User interfaces must be attractive
11. Client-side in HTML/JavaScript or React and server-side in SpringBoot, and running inside a Docker container.
12. Create Movie Detail Page
- Make genre and actors clickable, triggering a search when selected.
- Include hover controls to add movies to users' movie lists within the inline window.


13.Create Movie Montage page



requirements for security:
1. A session must timeout after 60 seconds of inactivity and return the user to the login screen 
2. An account must be locked after three consecutive failed logins within one minute, but is reset after an additional thirty seconds of no login attempts for the account. 
3. All user information, including passwords, must not be stored as plaintext
4. only logged in users can access search, details and other pages (user shouldnt be able to navigate to search or other pages by changing the url, if the user is not logged in.)
add logout (in the navbar)
5. ssl (https)

For search:
1. An error message will be displayed if the entered list name already exists
2. The user can see the set of lists the movie is already on when they click on an eye symbol
3. The user can obtain free tickets to the movie when they click on the $ symbol. 
4.add a dollar sign to take the user to a website to buy movie tickets for that movie.

Additional Hover Controls will be provided (for movie list):
1. A movie may be deleted from the list by clicking a minus symbol.  This action must be confirmed via a dialog box. 
2. A movie may be moved to another list by clicking an arrow symbol. Clicking the arrow symbol will display a drop down list of the other lists to which the movie can be moved or allow the user to create a new list and add the movie to that list.  After being moved, the movies will appear on the new list and not the source list. 
3. A movie may be copied to another list by clicking a copy symbol. Clicking the copy symbol will display a drop down list of the other lists to which the movie can be copied or allow the user to create a new list and add the movie to that list.  After being copied, the movies will appear on the new list and the source list. 
4. Selecting the option to create a new list for either the copy or move action will allow the user to enter a text name for a new list and then press Enter on the keyboard or press a “Create” button to finalize creation of the list and add the movie to the list.

for comparing:
A:<list name> and B:<list name>

for movie suggestion:
1. A user may ask the system to generate a new list based on results similar to the movies in a set of lists (source lists). The movies on the new list will be similar in theme to the movies on the lists selected by the user, but may not contain any results already in the source lists.  The user may select any subset of their lists to serve as guidance for this suggestion process
2. The user will click on a Suggestion button to trigger this list generation — Clicking the button will allow the user to enter a text name for the new list and then press Enter to finalize creation of the list 
3. There will be a text input box next to the Suggestion button for the purpose of indicating the number of suggestion to include in the new list
    1. The input box only accepts integers in the range of [1,10] 
    2. A tool tip will appear when hovering over the box that will specify “Enter the number of movies to suggest, maximum of 10” or similar text

UI requirements:
add an appname “Movie time”
should be shown on the header of all pages and also on login page and signup page
header or footer must contain a team number (having footer is not required, team number can be added to the header)


