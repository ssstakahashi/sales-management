import React from 'react';
import Header from '../views/header';
import Style from './Layout.module.scss';
import "fontsource-roboto"
import { theme } from './theme'
import { ThemeProvider as MaterialThemeProvider, StylesProvider} from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const Layout = ({children}) => {
    return (
        <StylesProvider injectFirst>
            <MaterialThemeProvider theme={theme}>
                <StyledThemeProvider theme={theme}>
                    <div className={Style.wrapper}>
                        <Header />
                        <div className={Style.main}>
                            {children}
                        </div>
                    </div>
                </StyledThemeProvider>
            </MaterialThemeProvider>
        </StylesProvider>
    )
}

export default Layout
