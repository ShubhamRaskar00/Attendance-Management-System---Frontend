import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RedditIcon from "@mui/icons-material/Reddit";
import { Link } from "react-router-dom";

function Footer() {
  const icons = [
    { Icon: YouTubeIcon, url: "https://www.youtube.com/@SR-SHUBH" },
    { Icon: XIcon, url: "https://x.com/sr_shubh99362" },
    {
      Icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/shubham-raskar-5126b5239/",
    },
    { Icon: RedditIcon, url: "https://www.reddit.com/user/sr_shubh/" },
  ];
  return (
    <AppBar position="static" sx={{ background: "black", color: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <Link to="/home">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                LoGO
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography sx={{ fontSize: "12px" }}>
              All rights reserved ® | Copyrights © {new Date().getFullYear()} |
              Developed by{" "}
              <Typography
                component="a"
                href="https://shubhamraskar00.github.io/"
                target="_blank"
                sx={{ fontSize: "12px" }}
              >
                SR SHUBH
              </Typography>
            </Typography>
          </Box>
          <Box className="space-x-4">
            {icons.map((item, index) => (
              <IconButton
                key={index}
                size="small"
                sx={{ color: "white" }}
                component="a"
                href={item.url}
                target="_blank"
              >
                <item.Icon />
              </IconButton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Footer;
