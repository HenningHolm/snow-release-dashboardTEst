import React, { createContext, useContext } from "react";
import { StoreActions, StoreState } from "../types/commonTypes";
import { useStore } from "./useStore";

interface StoreContextValue {
    state : StoreState
    actions: StoreActions
}


const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, actions] = useStore();

  const value: StoreContextValue = {
    state,
    actions,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStoreContext = (): StoreContextValue => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStoreContext må brukes innenfor en StoreProvider');
  }
  return context;
};