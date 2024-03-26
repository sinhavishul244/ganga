import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0087D1',
            dark: '#006ba4'
        }
    },
    typography: {
        fontFamily: [
            "Nunito",
            "sans-serif"
        ].join(','),
    }
})
