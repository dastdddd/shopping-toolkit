import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ListItem from '../list-item/listItem';
import { Box, Toolbar } from '@mui/material';
import { addToCart } from '../../redux/slices/productSlice';

const List = () => {
  const { products, cart } = useSelector(state => state.products)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem('sopping-cart', JSON.stringify(cart))
  }, [cart])

  return (
    <Toolbar>
      <Box sx={{
        marginTop: '50px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'center',
      }}>
        {
          products && products.map(item => <ListItem 
            color='#0984e3'
            onClick={()=>dispatch(addToCart(item.id))}
            btnText='Добавить в карзину'
            key={item.id}
            display='null'
            {...item} 
            />)
        }
      </Box>
    </Toolbar>
  );
};

export default List;