import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const colors = {
    text: {
        primary: '#FFFFFF',
        secondary: '#636669',
        disabled: '#636669',
    },
    primary: {
        dark: '#0cb259',
        main: '#12FF80',
        light: '#A1A3A7',
    },
    secondary: {
        dark: '#636669',
        main: '#FFFFFF',
        light: '#12FF80',
        background: '#1B2A22',
    },
    border: {
        main: '#636669',
        light: '#303033',
        background: '#121312',
    },
    error: {
        dark: '#AC2C3B',
        main: '#FF5F72',
        light: '#FFB4BD',
        background: '#2F2527',
    },
    success: {
        dark: '#028D4C',
        main: '#00B460',
        light: '#81C784',
        background: '#1F2920',
    },
    info: {
        dark: '#52BFDC',
        main: '#5FDDFF',
        light: '#B7F0FF',
        background: '#19252C',
    },
    warning: {
        dark: '#C04C32',
        main: '#FF8061',
        light: '#FFBC9F',
        background: '#2F2318',
    },
    background: {
        default: '#121312',
        main: '#121312',
        paper: '#1C1C1C',
        light: '#1B2A22',
    },
    backdrop: {
        main: '#636669',
    },
    logo: {
        main: '#FFFFFF',
        background: '#303033',
    },
    static: {
        main: '#121312',
    },
}

const typography = {
    fonts: {
        heading: 'DM Sans, sans-serif',
        body: 'DM Sans, sans-serif',
    },
    fontSizes: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
    },
    lineHeights: {
        normal: 'normal',
        none: 1,
        shorter: 1.25,
        short: 1.375,
        base: 1.5,
        tall: 1.625,
        taller: '2',
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 700,
    },
}

const shadows = {
    sm: '0 0 2px rgba(255, 255, 255, 0.1)',
    md: '0 1px 4px rgba(255, 255, 255, 0.1), 0 4px 10px rgba(255, 255, 255, 0.2)',
    lg: '0 2px 20px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(255, 255, 255, 0.2)',
    xl: '0 8px 32px rgba(255, 255, 255, 0.1), 0 24px 60px rgba(255, 255, 255, 0.2)',
}

const theme = extendTheme({
    config,
    colors,
    typography,
    shadows,
    space: {
        base: 8,
    },
    sizes: {
        borderRadius: 6,
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: 'base',
                fontWeight: 'bold',
                lineHeight: 1.25,
                textTransform: 'none',
                _hover: {
                    boxShadow: 'none',
                },
            },
            sizes: {
                sm: {
                    fontSize: '14px',
                    padding: '8px 24px',
                },
                md: {
                    fontSize: '16px',
                    padding: '12px 24px',
                },
                lg: {
                    fontSize: '16px',
                },
                stretched: {
                    padding: '12px 48px',
                },
            },
            variants: {
                outline: {
                    border: '2px solid',
                    _hover: {
                        border: '2px solid',
                    },
                },
                danger: {
                    bg: 'error.background',
                    color: 'error.main',
                    _hover: {
                        color: 'error.dark',
                        bg: 'error.light',
                    },
                },
            },
        },
        Accordion: {
            variants: {
                elevation: {
                    border: 'none',
                    boxShadow: '0',
                    _notLast: {
                        borderBottom: '1px solid',
                        borderColor: 'border.light',
                        borderRadius: '0 !important',
                    },
                    _last: {
                        borderBottomLeftRadius: '8px',
                    },
                },
            },
            baseStyle: {
                transition: 'background 0.2s, border 0.2s',
                borderRadius: 'base',
                border: '1px solid',
                borderColor: 'border.light',
                overflow: 'hidden',
                _before: {
                    content: 'none',
                },
                _hover: {
                    borderColor: 'secondary.light',
                },
                _hoverSummary: {
                    bg: 'background.light',
                },
                _expanded: {
                    margin: 0,
                    borderColor: 'secondary.light',
                },
                _expandedSummary: {
                    bg: 'background.light',
                },
            },
        },
        Card: {
            baseStyle: {
                borderRadius: 'base',
                boxSizing: 'border-box',
                border: '2px solid transparent',
                boxShadow: 'none',
            },
        },
        Divider: {
            baseStyle: {
                borderColor: 'border.light',
            },
        },
        Paper: {
            baseStyle: {
                borderRadius: 'base',
                bg: 'background.paper',
                boxShadow: 'none',
                border: '2px solid',
                borderColor: 'border.light',
            },
        },
        Tooltip: {
            baseStyle: {
                bg: 'text.primary',
                color: 'background.main',
                _link: {
                    color: 'secondary.main',
                    textDecorationColor: 'secondary.main',
                    _hover: {
                        color: 'secondary.light',
                    },
                },
            },
        },
        Backdrop: {
            baseStyle: {
                bg: 'backdrop.main',
            },
        },
        Alert: {
            variants: {
                standardError: {
                    icon: {
                        color: 'error.main',
                    },
                    container: {
                        bg: 'error.background',
                        border: '1px solid',
                        borderColor: 'error.main',
                    },
                },
                standardInfo: {
                    icon: {
                        color: 'info.main',
                    },
                    container: {
                        bg: 'info.background',
                        border: '1px solid',
                        borderColor: 'info.main',
                    },
                },
                standardSuccess: {
                    icon: {
                        color: 'success.main',
                    },
                    container: {
                        bg: 'success.background',
                        border: '1px solid',
                        borderColor: 'success.main',
                    },
                },
                standardWarning: {
                    icon: {
                        color: 'warning.main',
                    },
                    container: {
                        bg: 'warning.background',
                        border: '1px solid',
                        borderColor: 'warning.main',
                    },
                },
            },
            baseStyle: {
                color: 'text.primary',
                padding: '12px 16px',
            },
        },
    },
})

export default theme
