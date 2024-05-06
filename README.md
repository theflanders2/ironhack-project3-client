# Gameodex

https://gameodex.netlify.app

## Description
Developed as part of the 24-week Ironhack Full-stack Web Development course using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Gameodex is a single page application which allows site members to create their own personal index of Playstation console games they have played, are currently playing or would like to play.

Along with keeping track of games, members can add new games to the library, as well as leave comments on games that other members can also see.

Gameodex is equipped with full CRUD (create, read, update and delete) capabilities, as well as JSON Web Token (JWT) for authentication.

## Main Functionalities
- User creation via sign up form
- Authentication using JSON Web Token (JWT)
- Registered users can log in
- Logged in users can:
    - Add game, including cover art, to database
    - Added games are automatically added to user’s “games contributed” list
    - Edit game information including picture
    - Add game to “games played” list
    - Add game to “currently playing” list
    - Add game to “wishlist”
    - Leave a comment on a game
    - View comment of another user
    - Edit own comments
    - Delete own comments
    - Edit profile
- Multilingual support
- Theme selection

## Backlog
- Email authentication
- Stripe (payment service for donation purposes)
- React-Select for multi-select

## Technologies Used
- HTML
- CSS
- React.js
- React Router: Browser Router, Routes, Route, Link, NavLink, useNavigate, useParams
- React: useState, useEffect, useContext, createContext
- React Burger Menu
- Axios
- Netlify (deployment)

## Project Structure

### Middleware
- isAnon
- isPrivate

### Routes
| Path                      | Page                           | Permissions                 | Behavior                                                      |
| ------------------------- | ------------------------------ | --------------------------- | ------------------------------------------------------------- |
| `/`                       | HomePage                       | public `<Route>`            | GET Home page                                                 |
| `/about`                  | AboutPage                      | public `<Route>`            | GET About page                                                |
| `/signup`                 | SignupPage                     | anon only `<AnonRoute>`     | POST Signup form, link to login, navigate to login after      |
| `/login`                  | LoginPage                      | anon only `<AnonRoute>`     | POST Login form, link to signup, navigate to homepage after   |
| `/profile/:userId`        | ProfilePage                    | user only `<PrivateRoute>`  | GET User, get logged in user's profile page                   |
| `/profile/edit/:userId`   | EditProfilePage                | user only `<PrivateRoute>`  | PUT User, edit logged in user's profile                       |
| `/users/:userId`          | UserDetailsPage                | user only `<PrivateRoute>`  | GET User, get clicked on user's profile                       |
| `/games`                  | GamesListPage                  | user only `<PrivateRoute>`  | GET Games, get all games stored in the database               |
| `/games/:gameId`          | GameDetailsPage                | user only `<PrivateRoute>`  | GET Game, get retrieve the clicked on game from the database  |
| `/games/edit/:gameId`     | EditGamePage                   | user only `<PrivateRoute>`  | PUT Game, edit the selected game                              |
| `/comments/edit/:commentId`| EditCommentPage               | user only `<PrivateRoute>`  | PUT Comment, edit the selected comment                        |

### Components
- AddComment
- AddGame
- CommentCard
- Footer
- GameCard
- IsAnon
- IsPrivate
- Navbar
- Search
- Sidebar
- ToggleGamesCurrentlyPlaying
- ToggleGamesPlayed
- ToggleWishlist
- UserCommentCard

### Context
- auth.context
- burgerMenu.context
- language.context
- theme.context

### Supported Languages
- de-DE, Deutsch (Deutschland)
- en-US, English (US)

### Pages
- AboutPage
- EditCommentPage
- EditGamePage
- EditProfilePage
- GameDetailsPage
- GamesListPage
- HomePage
- LoginPage
- ProfilePage
- SignupPage
- UserDetailsPage

### Services
- auth.service
- comments.service
- games.service
- users.service

## States
- Non-registered user
- Registered User

## Links
- [Trello Link] (https://trello.com/b/mQz0dVtV/ironhack-project-3)
- [Github Repository Link] (https://github.com/theflanders2/ironhack-project3-client)
- Deployment Link (https://gameodex.netlify.app)

## Contributors / Team
[Kenneth Flanders] (https://github.com/theflanders2) (https://www.linkedin.com/in/kwflanders)