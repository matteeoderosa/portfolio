/** Inline no-flash script: applies a stored theme before first paint and marks that scripts run (so reveal styles never hide content without JS). */
export const THEME_SCRIPT = `document.documentElement.classList.add("js");try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
