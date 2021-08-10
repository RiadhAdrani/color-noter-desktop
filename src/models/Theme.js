const createColorTheme = (lighter, light, normal, dark, darker) => {
     return {
          lighter: lighter,
          light: light,
          normal: normal,
          dark: dark,
          darker: darker,
     };
};

const Theme = [
     createColorTheme("#FFF5D6", "#ECCE83", "#E2B33C", "#B1871B", "#6A5111"), // Orange yellow
     createColorTheme("#D3D8EE", "#8997D1", "#4357AD", "#2E3B76", "#171E3B"), // blue liberty
     createColorTheme("#C5E7D0", "#8CCFA1", "#429E5F", "#36814E", "#245634"), // Green
     createColorTheme("#EBEBEB", "#C2C2C2", "#999999", "#7A7A7A", "#525252"), // Grey
     createColorTheme("#F5B8B8", "#ED8282", "#E54B4B", "#B31919", "#7D1212"), // Imperial Red
     createColorTheme("#FCC3FD", "#F875FA", "#F426F7", "#9B069D", "#4D034F"), // Pink
     createColorTheme("#FAD3B3", "#F5A666", "#F07A19", "#C05D0C", "#864109"), // Orange
     createColorTheme("#BFEEE8", "#6ED8CA", "#2FB1A0", "#1A6157", "#12403B"), // Green Charcoal
     createColorTheme("#ADF1FF", "#5CE4FF", "#0099B8", "#005566", "#003D52"), // Cyan
     createColorTheme("#F8C9CB", "#EA5D64", "#C71A22", "#7E1016", "#360709"), // Red Bordeaux
     createColorTheme("#ECDCF9", "#C696ED", "#8D2EDC", "#621B9D", "#421269"), // Purple
     createColorTheme("#8EE1D9", "#4ED0C3", "#2A9D8F", "#1E7167", "#11403B"), // Persian Green
];

export default Theme;
