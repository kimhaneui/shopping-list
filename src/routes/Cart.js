import {Table} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { increase,decrease } from '../store/store';


function Cart(){
    let state = useSelector((state)=>{return state})
    let dispatch = useDispatch()
    console.log(state,'a');
    return (
        <div>
            <Table>
            <thead>
                <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
            {
            state.cart.map((a, i)=>
            <tr key={i}>
                <td>{state.cart[i].id}</td>
                <td>{state.cart[i].name}</td>
                <td>{state.cart[i].count}</td>
                <td>
                    <button onClick={()=>{
                        dispatch(increase(state.cart[i].id))
                    }}>+</button>
                    <button onClick={()=>{
                        dispatch(decrease(i))
                    }}>-</button>
                </td>
            </tr>
                )
            }
            </tbody>
            </Table> 
        </div>
    )
}

export default Cart