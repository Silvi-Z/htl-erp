import { createGlobalStyle } from 'styled-components';
export const GlobalStyles = createGlobalStyle`
  *,*::before,*::after{box-sizing:border-box}
  html,body,#root{min-height:100%;margin:0}
  body{font-family:${p=>p.theme.typography.body};font-size:14px;line-height:1.45;color:${p=>p.theme.colors.ink};background:${p=>p.theme.colors.paper};-webkit-font-smoothing:antialiased}
  button,input,select,textarea{font:inherit}
  button{border:0}
  a{color:inherit}
  ::selection{background:${p=>p.theme.colors.primarySoft}}
`;
