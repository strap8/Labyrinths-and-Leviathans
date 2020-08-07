const PRIMARY_COLOR = "--primaryColor"
const PRIMARY_RGB_COLOR = "--primaryColorRGB"
const SECONDARY_COLOR = "--secondaryColor"
const TERTIARY_COLOR = "--tertiarycolor"
const QUATERNARY_COLOR = "--quaternaryColor"
const QUINARY_COLOR = "--quinaryColor"

const COLOR_VAR_MAP = {
  PRIMARY_COLOR: `var(${PRIMARY_COLOR})`,
  PRIMARY_RGB_COLOR: `var(${PRIMARY_RGB_COLOR})`,
  SECONDARY_COLOR: `var(${SECONDARY_COLOR})`,
  TERTIARY_COLOR: `var(${TERTIARY_COLOR})`,
  QUATERNARY_COLOR: `var(${QUATERNARY_COLOR})`,
  QUINARY_COLOR: `var(${QUINARY_COLOR})`
}

const DARK_MODE_THEME = {
  [PRIMARY_COLOR]: "#29303b",
  [PRIMARY_RGB_COLOR]: "41, 48, 59",
  [SECONDARY_COLOR]: "white",
  [TERTIARY_COLOR]: "#bdc3c7",
  [QUATERNARY_COLOR]: "rgb(21, 32, 43)",
  [QUINARY_COLOR]: "#1f2326"
}

const LIGHT_MODE_THEME = {
  [PRIMARY_COLOR]: "white",
  [PRIMARY_RGB_COLOR]: "255, 255, 255",
  [SECONDARY_COLOR]: "black",
  [TERTIARY_COLOR]: "rgba(0, 0, 0, 0.75)",
  [QUATERNARY_COLOR]: "#dfe6e9",
  [QUINARY_COLOR]: "#bdc3c7"
}

const mapThemeProperties = (themeObject) => {
  let root = document.documentElement

  for (const [key, value] of Object.entries(themeObject)) {
    root.style.setProperty(key, value)
  }
}

const changeTheme = (darkMode) =>
  darkMode
    ? mapThemeProperties(DARK_MODE_THEME)
    : mapThemeProperties(LIGHT_MODE_THEME)

export {
  COLOR_VAR_MAP,
  DARK_MODE_THEME,
  LIGHT_MODE_THEME,
  mapThemeProperties,
  changeTheme
}
