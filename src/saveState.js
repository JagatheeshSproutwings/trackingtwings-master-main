// saveState.js

export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('appState', serializedState);
    } catch (error) {
      // Handle errors here, e.g., log them to the console
    }
  };
  