// import { useState } from 'react';
// import Select from 'react-select';

// const options = [
//   { label: "Action", value: "Action" },
//   { label: "Adventure", value: "Adventure" },
//   { label: "Arcade", value: "Arcade" },
//   { label: "Battle royale", value: "Battle royale" },
//   { label: "Casual", value: "Casual" },
//   { label: "Fighting", value: "Fighting" },
//   { label: "First-person shooter (FPS)", value: "First-person shooter (FPS)" },
//   { label: "Horror", value: "Horror" },
//   { label: "Massively Multiplayer Online (MMO)", value: "Massively Multiplayer Online (MMO)" },
//   { label: "Multiplayer", value: "Multiplayer" },
//   { label: "Multiplayer online", value: "Multiplayer online" },
//   { label: "Multiplayer online battle arena (MOBA)", value: "Multiplayer online battle arena (MOBA)" },
//   { label: "Platformer", value: "Platformer" },
//   { label: "Puzzle", value: "Puzzle" },
//   { label: "Racing", value: "Racing" },
//   { label: "Role-playing game (RPG)", value: "Role-playing game (RPG)" },
//   { label: "Sandbox", value: "Sandbox" },
//   { label: "Shooter", value: "Shooter" },
//   { label: "Simulation", value: "Simulation" },
//   { label: "Sports", value: "Sports" },
//   { label: "Stealth", value: "Stealth" },
//   { label: "Strategy", value: "Strategy" },
//   { label: "Survival", value: "Survival" },
//   { label: "Tactical role-playing game (RPG)", value: "Tactical role-playing game (RPG)" }
// ];

const SelectGenre = () => {
  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleChange = (selectedOptions) => {
  //   setSelectedOptions(selectedOptions);
  // };

  return (
    // <Select
    //   options={options}
    //   isMulti
    //   value={selectedOptions}
    //   onChange={handleChange}
    // />
    <>
      <option></option>
      <option value="Action">Action</option>
      <option value="Adventure">Adventure</option>
      <option value="Arcade">Arcade</option>
      <option value="Battle royale">Battle royale</option>
      <option value="Casual">Casual</option>
      <option value="Fighting">Fighting</option>
      <option value="FPS">FPS</option>
      <option value="MMO">MMO</option>
      <option value="Multiplayer">Multiplayer</option>
      <option value="Multiplayer online">Multiplayer online</option>
      <option value="MOBA">MOBA</option>
      <option value="Platformer">Platformer</option>
      <option value="Puzzle">Puzzle</option>
      <option value="Racing">Racing</option>
      <option value="RPG">RPG</option>
      <option value="Sandbox">Sandbox</option>
      <option value="Shooter">Shooter</option>
      <option value="Simulation">Simulation</option>
      <option value="Sports">Sports</option>
      <option value="Stealth">Stealth</option>
      <option value="Strategy">Strategy</option>
      <option value="Survival">Survival</option>
      <option value="Tactical RPG">Tactical RPG</option>
    </>
  );
};

export default SelectGenre;
