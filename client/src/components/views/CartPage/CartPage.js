import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCartItems} from '../../../_action/user_action'
import {message, Button} from 'antd'
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
    const [selected, setSelected] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.userData && user.userData.cart) {
            dispatch(getCartItems(user.userData.cart))
                .then(response => setProducts(response.payload.product))
        }
        
    }, [user.userData])

    useEffect(() => {
        setTotalPrice(selected.reduce((sum, element) => {
            return sum + products[element].price * products[element].quantity;
        }, 0));
    }, [selected])

    function onRemoveHanlder(event) {
        console.log(selected);
        /** redux 통해서 삭제 */
    }

    return (
        <div style = {{width : '85%', margin : '3rem auto'}}>
            <h1>장바구니</h1>
            <UserCardBlock products = {products} setSelected = {setSelected}/>
            <Button style={{marginTop : "3rem"}} disabled = {selected.length ? false : true} onClick = {onRemoveHanlder}>Remove</Button>

            <div style = {{display : 'flex', marginTop : "3rem"}}>
                <h1>Total Price : $ {totalPrice}</h1>
                <Button type = 'primary' size = 'large' style = {{marginLeft : 'auto'}}>Buy</Button>
            </div>
        </div>
    )
}

export default CartPage