// loadState.js

export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('appState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (error) {
      // Handle errors here, e.g., log them to the console
      return undefined;
    }
  };
  