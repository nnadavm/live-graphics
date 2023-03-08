import React, { useEffect, useState } from "react";

export const Context = React.createContext();

export function ContextProvider({ children , value }) {

    return (
        <Context.Provider value={ value }>
            {children}
        </Context.Provider>
    );
};
