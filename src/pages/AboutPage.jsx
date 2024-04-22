function AboutPage() {
  return (
    <div className="AboutPage">
      <h1 className>About Gameodex</h1>
      <p>
        Developed as part of the 24-week Ironhack Full-stack Web Development
        course using the MERN stack (MongoDB, Express.js, React.js, and
        Node.js), Gameodex is a single page application which allows site
        members to create their own personal index of Playstation console games
        they have played, are currently playing or would like to play.
      </p>
      <p>
        Along with keeping track of games, members can add new games to the
        library, as well as leave comments on games that other members can also
        see.
      </p>
      <p>
        Gameodex is equipped with full CRUD (create, read, update and delete)
        capabilities, as well as JSON Web Token (JWT) for authentication.
      </p>
    </div>
  );
}

export default AboutPage;
