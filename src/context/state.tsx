import { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';

const ctx : Context = {
  state: {
    user: undefined,
    localStorageLoaded: false,
  },
  setContext: (data: ContextState) => {}
};

const AppContext = createContext(ctx);

interface UserContext {
  userName?: string,
  userId?: number,
}

export interface ContextState {
  user: UserContext,
  localStorageLoaded: boolean,
}

interface Context {
  state: ContextState;
  setContext: Dispatch<SetStateAction<ContextState>>
}

export function AppWrapper({ children }) {
  const [state, setContext] = useState<ContextState>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const update = {
        localStorageLoaded: true,
        user: {},
      }

      if(localStorage.getItem('user')){
        update.user = JSON.parse(localStorage.getItem('user'));
      }

      setContext(prevState => ({ ...prevState, ...update }))
    }
  }, [])

  return (
    <AppContext.Provider value={{state, setContext}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}