import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

export default function ListItem({
  brand,
  description,
  title,
  price,
  thumbnail,
  discountPercentage,
  onClick,
  btnText,
  color,
  display,
}) {
//onClick, btnText, color, display - бул через пропс келет карзинага да главный аттарын озгортуш учун

  let discount = price - (price * discountPercentage) / 100;
//discount - скидканы эсептейт

  return (
    <Card
      sx={{
        width: 345,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          sx={{ objectFit: "contain" }}
          image={thumbnail}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            brand:{brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: "line-through", fontSize: "18px" }}
          >
            {price}$
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Скидка: {discountPercentage}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "20px" }}
          >
            Сумма со скидкой: {Math.floor(discount)}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
//пропс менен киргиздик color:color, onClick={onClick}, {btnText}, display === 'null
//{...item} деп жазган учун ал жакта прямой береберебиз
//Пропстарды ушул жерге жаздык чтобы list.js те башка ат менен жана cart.js те башка ат менен
          sx={{ color: color }}
          size="small"
          onClick={onClick}
        >
          {btnText}
          {display === "null" ? (
            <ShoppingCartOutlinedIcon />
          ) : (
            <DeleteOutlineOutlinedIcon />
          )}
{/* бул строка материалЮАЙ дан иконка: display НУЛ болсо ал сурот болбосо берки сурот */}
        </Button>
      </CardActions>
    </Card>
  );
}
