import React from "react";
import { Box, Toolbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, openToggleModal } from "../../redux/slices/productSlice";
import ListItem from "../../components/list-item/listItem";
import axios from "axios";
import MyModal from "../../components/panel/modal";
import moment from "moment/moment"; //дата время чыгарыш учун импонт кылабыз
import "moment/locale/ky"; //дата время чыгарыш учун импонт кылабыз

const Cart = () => {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  //-----------------скидканы чыгаратурган кодтор---------------------------
  const total = cart.reduce(
    (acc, item) =>
      acc +
      Math.floor(item.price - (item.price * item.discountPercentage) / 100),
    0
  ); 
//---------------------корзинада эштеке жок болсо---------------------------
  if (cart.length === 0) {
    return <h1>Пусто</h1>;
  } 

  //------------------------------------пост запрос------------------------------
  let token = "bot6705528569:AAGcrsBXWKz8moMG_BkTno3nTqLKfMaSGJ4";
  let api = "https://api.telegram.org/";
  let chat_id = "-4009314958";
  axios.defaults.baseURL = `${api}${token}/`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  //обязательно пост запроско жонотулот   файлга башкача жонотулот

  const postOrderProduct = async (form) => {
    //--------дата время чыгарганы---------------------------
    const date = new Date();
    let fixedMomentDate = moment(date).locale("ky").format("DD/MM/YY HH:mm:ss");
    //----------------------------------------------
    try {
      const res = await axios.post("sendMessage", {
        chat_id: chat_id,
        parse_mode: "HTML",
        text: `<b>Adress: ${form.adress}</b>
        \n<b>phone number: ${form.phone}</b>
        \n<b>Дата и время: ${fixedMomentDate}</b>
        \n${cart.map((item) => `\nproduct name ${item.title}`)}
        \nTotal summ: ${total} $`,
        //\n - телеграммдагы жазылыштар
      });
    } catch (e) {}
  };
  //-----------------------------------------------------------------------

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          padding: "0 10px",
        }}
      >
        <h1 style={{}}>Общая сумма со скидкой:${total}</h1>

        {/* открывает модальное окно */}
        <button onClick={() => dispatch(openToggleModal(true))}>
          Оформить заказ
        </button>

        <MyModal postOrderProduct={postOrderProduct} />
        {/* postOrderProduct - через пропм модальный окного бертабыз */}
      </div>
      <Toolbar sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            marginTop: "50px",
            display: "flex",
            flexWrap: "wrap",
            gap: "30px",
            justifyContent: "center",
          }}
        >
          {
            //cart - пустой массив и добавили как ListItem чтоб стиль тот же но с некоторыми изменениями
            cart &&
              cart.map((item) => (
                <ListItem
                  //некоторые приходят из пропса потому что из {...item} приходят все пропсы
                  color="#d63031"
                  onClick={() => dispatch(deleteItem(item.id))}
                  btnText="Удалить из карзины"
                  display="block"
                  key={item.id}
                  {...item}
                />
              ))
          }
        </Box>
      </Toolbar>
    </>
  );
};

export default Cart;
