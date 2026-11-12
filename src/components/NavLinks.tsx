import { useState } from "react";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";

// The pages in the app bar. Add a new page here and it shows up in both menus.
const PAGES = [
  { label: "Customers", path: "/customers" },
  { label: "Trainings", path: "/trainings" },
  { label: "Calendar", path: "/calendar" },
  { label: "Statistics", path: "/statistics" },
];

// NavLink gives the link of the open page the class "active".
// These styles make that link stand out.
const activeButtonStyle = {
  "&.active": {
    bgcolor: "rgba(255, 255, 255, 0.2)",
    fontWeight: "bold",
  },
};

const activeMenuItemStyle = {
  "&.active": {
    bgcolor: "action.selected",
    fontWeight: "bold",
  },
};

function NavLinks() {
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  return (
    <>
      {/* Wide screens (md = 900px and wider): a button for each page */}
      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
        {PAGES.map((page) => (
          <Button
            key={page.path}
            color="inherit"
            component={NavLink}
            to={page.path}
            sx={activeButtonStyle}
          >
            {page.label}
          </Button>
        ))}
      </Box>

      {/* Phones and small tablets: one menu button that opens a list of the pages */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          color="inherit"
          aria-label="Open menu"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={menuAnchor !== null}
          onClose={() => setMenuAnchor(null)}
        >
          {PAGES.map((page) => (
            <MenuItem
              key={page.path}
              component={NavLink}
              to={page.path}
              onClick={() => setMenuAnchor(null)}
              sx={activeMenuItemStyle}
            >
              {page.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}

export default NavLinks;
