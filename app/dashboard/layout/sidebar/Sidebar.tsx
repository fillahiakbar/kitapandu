"use client";

import React from "react";
import { Box, Drawer, useMediaQuery, useTheme } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: SidebarProps) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const sidebarWidth = 270;

  // Custom scrollbar styles
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  // ==============================
  // DESKTOP SIDEBAR
  // ==============================
  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: "border-box",
              ...scrollbarStyles,
            },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <SidebarItems />
          </Box>
        </Drawer>
      </Box>
    );
  }

  // ==============================
  // MOBILE SIDEBAR
  // ==============================
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      ModalProps={{
        keepMounted: true, // better performance on mobile
      }}
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      <Box sx={{ height: "100%" }}>
        <SidebarItems />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
