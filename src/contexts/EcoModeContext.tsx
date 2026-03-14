import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface EcoModeContextType {
  ecoMode: boolean;
  setEcoMode: (v: boolean) => void;
}

const EcoModeContext = createContext<EcoModeContextType>({ ecoMode: false, setEcoMode: () => {} });

export const useEcoMode = () => useContext(EcoModeContext);

export const EcoModeProvider = ({ children }: { children: ReactNode }) => {
  const [ecoMode, setEcoMode] = useState(() => localStorage.getItem("eco-mode") === "true");

  useEffect(() => {
    localStorage.setItem("eco-mode", String(ecoMode));
    if (ecoMode) {
      document.documentElement.classList.add("eco-mode");
    } else {
      document.documentElement.classList.remove("eco-mode");
    }
  }, [ecoMode]);

  return (
    <EcoModeContext.Provider value={{ ecoMode, setEcoMode }}>
      {children}
    </EcoModeContext.Provider>
  );
};
