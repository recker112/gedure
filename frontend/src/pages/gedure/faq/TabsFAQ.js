import React from "react";

// MUI
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";

// Redux
import { useSelector } from "react-redux";

export const GedureTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    backgroundColor: "#fff",
  },
});

export const GedureTab = styled((props) => <Tab to={props.value} {...props} />)(
  {
    "&.Mui-selected": {
      color: "#fff",
    },
  }
);

export function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

const TabsV = [
  {
    label: "Boletas",
    value: "boletas",
  },
  {
    label: "Monedero",
    value: "monedero",
  },
  {
    label: "Deudas",
    value: "deudas",
  },
];

const TabsA = [
  {
    label: "Usuarios",
    value: "usuarios",
  },
  {
    label: "Boletas",
    value: "boletas",
  },
];

/**
 * Tabs renderizadas en el FAQ
 * @param {object} param0 Props
 * @returns JSX.Element
 */
export function TabsFAQ({ value, handleChange }) {
  const { privilegio } = useSelector((state) => ({
    privilegio: state.auth.user.privilegio,
  }));

  return (
    <GedureTabs
      value={value}
      variant="scrollable"
      onChange={handleChange}
      scrollButtons
      allowScrollButtonsMobile
    >
      <GedureTab label="Todas" value="all" {...a11yProps(0)} />
      {privilegio === "V-" &&
        TabsV.map((item, i) => (
          <GedureTab
            key={i + 1}
            label={item.label}
            value={item.value}
            {...a11yProps(i + 1)}
          />
        ))}

      {privilegio === "A-" &&
        TabsA.map((item, i) => (
          <GedureTab
            key={i + 1}
            label={item.label}
            value={item.value}
            {...a11yProps(i + 1)}
          />
        ))}
    </GedureTabs>
  );
}
