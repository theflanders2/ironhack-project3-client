import { useState, createContext } from 'react'

const BurgerMenuContext = createContext();

function BurgerMenuProviderWrapper(props) {
  const [menuOpenState, setMenuOpenState] = useState(false);

  const isMenuOpen = menuOpenState;

  const toggleMenu = () => {
    setMenuOpenState(!menuOpenState);
  };

  const stateChangeHandler = (newState) => {
    setMenuOpenState(newState.isOpen);
  };
  
  return (
    <BurgerMenuContext.Provider value={{ isMenuOpen, toggleMenu, stateChangeHandler }}>
      {props.children}
    </BurgerMenuContext.Provider>
  );
}

export { BurgerMenuContext, BurgerMenuProviderWrapper };