import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usersService from "../services/users.service";

function EditProfilePage() {
  const [email, setEmail] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    usersService.getUser(userId)
      .then((foundUser) => {
        // Update the state with the game data coming from the response.
        // This way the inputs show the actual current details of the game
        setEmail(foundUser.data.user.email);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email };

    // Make an axios PUT request to the API to update game
    usersService.updateUser(userId, requestBody)
      .then(() => navigate(`/profile/${userId}`));
    // Once the request is resolved successfully and the game's details
    // are updated, navigate back to the details page
  };

  return (
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="submit" value="Confirm Changes" />
      </form>
    </div>
  );
}

export default EditProfilePage;
