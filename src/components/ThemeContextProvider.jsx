import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [myTheme, setMyTheme] = useState(() => {
        return localStorage.getItem("myTheme") || "light";
    });

    useEffect(() => {
        if (myTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("myTheme", myTheme);
    }, [myTheme]);

    const toggleTheme = () => {
        setMyTheme(myTheme === "dark" ? "light" : "dark");
    };
    const setDarkTheme = () => {
        setMyTheme("dark");
    };
    const setLightTheme = () => {
        setMyTheme("light");
    };

    return (
        <ThemeContext.Provider value={{ myTheme, toggleTheme, setDarkTheme, setLightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useCustomTheme = () => useContext(ThemeContext);
