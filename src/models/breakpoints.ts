const breakpoints = {
    xs: 320, // Extra pequeño (móviles pequeños)
    sm: 480, // Pequeño (móviles más grandes)
    md: 768, // Mediano (tablets)
    lg: 1024, // Grande (laptops)
    xl: 1280, // Extra grande (monitores grandes)
    xxl: 1536, // Pantallas extra anchas
  };
  
  export type BreakpointKey = keyof typeof breakpoints;
  
  export const getBreakpoint = (key: BreakpointKey): number => breakpoints[key];
  
  export default breakpoints;
  