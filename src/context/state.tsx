import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext([{
  user: undefined,
  localStorageLoaded: false,
}]);

export interface ContextState {
  user: string,
  localStorageLoaded: boolean,
}

export function AppWrapper({ children }) {
  const [state, setContext] = useState<ContextState>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const update = {
        localStorageLoaded: true,
        user: "",
      }

      if(localStorage.getItem('user')){
        update.user = localStorage.getItem('user');
      }

      setContext(prevState => ({ ...prevState, ...update }))
    }
  }, [])

  return (
    <AppContext.Provider value={[state, setContext]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}