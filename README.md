# Gameodex

https://gameodex.netlify.app

## Description
Gameodex is a site where you can create a personal index of Playstation console games you have played, are currently playing or would like to play. Along with keeping track of games, you can add games to the database, as well as leave comments on games that other members of the site can also see.

## Main Functionalities
- User creation via sign up form
- Authentication using JSON Web Token (JWT)
- Registered users can log in
Logged in users can:
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
- Client
- HTML
- CSS
- React.js
- React Router: Browser Router, Routes, Route, Link, NavLink, useNavigate, useParams
- React: useState, useEffect, useContext, createContext
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