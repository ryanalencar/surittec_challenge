import 'styled-components';

import { theme } from '../styles/theme';

type ITheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
