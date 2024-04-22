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

## Backlog
- Email authentication
- Stripe (payment service for donation purposes)
- React-Select for multi-select
- Multilingual support

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
- "/"
- "/about"
- "/signup"
- "/login"
- "/profile/:userId"
- "/profile/edit/:userId
- "/users/:userId
- "/games"
- "/games/:gameId"
- "/games/edit/:gameId"
- "comments/edit/:commentId"

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

### Components
- AddComment
- AddGame
- CommentCard
- Footer
- GameCard
- Navbar
- Search
- ToggleGamesCurrentlyPlaying
- ToggleGamesPlayed
- ToggleWishlist
- UserCommentCard

### Context
- auth.context
- language.context
- theme.context

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
[Kenneth Flanders] (https://github.com/theflanders2)