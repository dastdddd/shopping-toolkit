import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Appbar() {
  const { cart } = useSelector((state) => state.products);
  const navigate = useNavigate(); //useNavigate - navigate ке киргизип алдык
  const navItems = [
    { id: 1, route: "/", title: "Главная" }, //массив кылдык чтобы кликте откоруш учун navigate менен
    { id: 2, route: "/cart", title: "Корзина" },
  ];

  const togglePage = (route) => {
    navigate(route); //navigate  route кидгиздик
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "#5f27cd",
          position: "initial !important", //important - обьязательно будет работать(для страховки)
        }}
        component="nav"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <IconButton>
              <HomeIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                onClick={() => togglePage(item.route)}
                //togglePage(item.route) - бул жерде через navigate массивдин route келет
                key={item.id}
                sx={{ color: "#fff" }}
              >
                {item.title === "Корзина"
                  ? `${item.title} (${cart.length})`
                  : item.title}
                {/* item.title - Текстерин чыгарабыз
                    Если КОРЗИНА тексти болсо скобкага(кол-ва) иначе только title-тексттери чыксын */}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
