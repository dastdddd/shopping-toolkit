import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { openToggleModal, removeCart } from '../../redux/slices/productSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const initialState = {
  //name кандай болсо ошондой ачылат 
  adress: '',
  phone: ''
};


const MyModal = ({postOrderProduct}) => {

  const [form, setForm] = useState(initialState)


  const { open } = useSelector(state => state.products);
  const dispatch = useDispatch();

const handleChange = (event) => {
  setForm({...form, [event.target.name]: event.target.value })
}

const handleClick =()=> {
  postOrderProduct(form)//formду полный киргиздик
  setTimeout(()=>{
    dispatch(openToggleModal(false))//оформить басканда модальн окно жабылат
    dispatch(removeCart())//фунциясында очистка пустой массив болот жана локалсторедж удалить болот
  },1500)
}

  return (
    <div>

      <Modal
        keepMounted
        open={open}//озу ушундай жазылат 
        onClose={() => dispatch(openToggleModal(false))}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField 
              id="outlined-basic" 
              value={form.adress}
              name='adress' 
              label="Adress" 
              variant="outlined"
              onChange={handleChange} />
            {/* TextField - материал ЮАЙ дан алдык */}
            <TextField 
              id="outlined-basic" 
              value={form.phone}
              name='phone' 
              label="Phone" 
              onChange={handleChange} 
              variant="outlined" />
          </div>
          <Button 
            variant="outlined"
            onClick={handleClick}
            >Оформить</Button>
          <Button 
            variant="outlined"
            onClick={()=>dispatch(openToggleModal(false))}>Отмена</Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MyModal;