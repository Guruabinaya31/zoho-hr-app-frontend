import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [currentForm, setCurrentForm] = useState(null);
  return (
    <FormContext.Provider value={{ currentForm, setCurrentForm }}>
      {children}
    </FormContext.Provider>
  );
};
