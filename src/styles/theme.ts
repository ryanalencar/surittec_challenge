interface ITheme {
  colors: {
    background: string;
    grey600: string;
    grey900: string;
    white: string;
    black: string;
    error: string;
    purpleLight: string;
    purpleMid: string;
    purpleDark: string;
    greenLight: string;
    greenMid: string;
    greenDark: string;
    text: string;
  };
}

export const theme: ITheme = {
  colors: {
    background: '#202024',
    grey900: '#121214',
    grey600: '#323238',
    white: '#FFFFFF',
    black: '#000000',
    error: '#CC2937',
    purpleLight: '#996DFF',
    purpleMid: '#8257E5',
    purpleDark: '#633BBC',
    greenLight: '#00B37E',
    greenMid: '#00875F',
    greenDark: '#015F43',
    text: '#C4C4CC',
  },
};
