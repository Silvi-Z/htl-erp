export const theme = {
  colors: { ink:'#1b1a17', inkSecondary:'#3d3a34', muted:'#8a8478', paper:'#f6f2ea', card:'#fffdf8', sand:'#efe7d7', primary:'#c0601f', primaryDark:'#9c4a12', primarySoft:'#fbeadd', charcoal:'#1a1916', cream:'#efe7d5', creamMuted:'#b8ad97', success:'#3f6d4e', successBg:'#e2ede2', warning:'#b06a12', warningBg:'#f7ead2', danger:'#a33', dangerBg:'#f4e0dd', border:'#e3ddd1', borderLight:'#efe9dd', white:'#fff' },
  spacing:{xs:'4px',sm:'8px',md:'12px',lg:'16px',xl:'20px',xxl:'24px',xxxl:'32px'},
  radius:{sm:'6px',md:'8px',lg:'10px',xl:'12px',xxl:'16px',pill:'999px'},
  shadows:{sm:'0 1px 2px rgba(30,25,15,.05)',md:'0 8px 24px -12px rgba(30,25,15,.18)'},
  typography:{body:"'Noto Sans Armenian', system-ui, sans-serif",display:"'Noto Serif Armenian', serif",mono:"'JetBrains Mono', monospace"}
};
export type AppTheme = typeof theme;
