import React from 'react'
import {createTheme} from '@mui/material/styles'
import {grey, lightBlue} from '@mui/material/colors'
import {ReactNode} from 'react'
import {ThemeProvider} from '@mui/material'



type Props = {
  children: ReactNode
}

export const ThemeComposition = ({children}: Props): JSX.Element => {
    const theme = createTheme({
        palette: {
            primary: {
                main: grey[900]
            },
            secondary: {
                main: lightBlue[800],
                contrastText: lightBlue[100]

            },
            mode: 'dark'
        },

        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        boxShadow: '0 0 1rem 0 rgba(204, 204, 204, 0.3)',
                        borderWidth: '1px',
                        borderColor: 'rgba(153, 153, 153, 0.7)',
                        borderStyle: 'solid'
                    }
                }
            },
            MuiPopover: {
                styleOverrides: {
                    paper: {
                        maxWidth: '590px',
                        width: '100%',
                        backgroundColor: '#027bde',
                        color: 'white'
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: '#e0e0e0',
                        backgroundColor: '#0277bd71',
                        transition: 'filter background 0.07s ease-out',
                        '&:hover': {
                            filter: 'hue-rotate(3deg) saturate(1.5) contrast(1.3)'
                        }
                    },
                    containedWarning: {
                        backgroundColor: '#bf360c71'
                    },
                    containedSuccess: {
                        backgroundColor: '#2e7d3271'
                    }
                }
            },
            MuiButtonGroup: {
                styleOverrides: {
                    root: {
                        borderColor: '#027bde',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                    }
                }
            },
            MuiBadge: {
                styleOverrides: {
                    badge: {
                        pointerEvents: 'all'
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    h4: {
                        marginBottom: '15px'
                    },
                    h6: {
                        marginBottom: '10px'
                    },
                    body1: {
                        textIndent: '5px'
                    }
                }
            }
        }
    })

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
