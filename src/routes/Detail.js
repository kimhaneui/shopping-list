import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {Nav} from 'react-bootstrap'
import {useState,useEffect, useContext} from 'react'
import { useSelector, useDispatch } from "react-redux"
import { StockContext } from './../App.js'
import { addItem } from '../store/store.js'

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : black;
  padding : 10px;
`;

function Detail(props){
  let {stock} = useContext(StockContext)

  let {id} = useParams();
  let product = props.shoes.find(x=>x.id === parseInt(id));
  let [tab, tabUpdate] = useState(0);
  let dispatch = useDispatch()

  useEffect(() => {
    let item = localStorage.getItem('watched')
    item = JSON.parse(item)
    item.push(product.id)
    item = new Set(item)
    item = Array.from(item)
    localStorage.setItem('watched', JSON.stringify(item))
    }, []);

  return(
      <div className="container">
        {
          alert === true ?
          <div className='alert'>
          2초 이내 구매시 할인
          </div> : null 
        }
        {count}
        <button onClick={()=>{setCount(count+1)}}> + 버튼</button>
        <button onClick={()=>{setCount(count-1)}}> - 버튼</button>
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" alt="shoes" width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{product.title}</h4>
            <p>{product.content}</p>
            <p>{product.price}원</p>
            <p>재고{stock}</p>
            <button className="btn btn-danger" onClick={()=>{
              dispatch(addItem({id: product.id, name: product.title, count: 1}))
            }}>주문하기</button>
          </div>
          <div>
          <Nav variant="tabs"  defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link onClick={()=>{ tabUpdate(0) }} eventKey="link0">상세설면</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{ tabUpdate(1) }} eventKey="link1">리뷰</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{ tabUpdate(2) }} eventKey="link2">문의</Nav.Link>
          </Nav.Item>
          </Nav>
          <TabContent tab={tab} product={product}/>

        <YellowBtn bg="orange">오렌지색</YellowBtn>
        <YellowBtn bg="blue">파란색</YellowBtn>
    </div>
        </div> 
      </div> 
    )
}
function TabContent(props){
  let [fade, setFade] = useState('')

  useEffect(()=>{
    setTimeout(()=>{ setFade('end') }, 100)
    return ()=>{
      setFade('')
    }
  }, [props.tab])
  switch (props.tab) {
    case 0:
      return [<div className={'start '+fade}>
        <h2>상세설명란</h2> 
        <div>{props.product.description}</div>
        </div>]
    break;
    case 1:
      return [<div>리뷰란</div>]
    break;
    case 2:
      return [<div>문의란</div>]
    break;
  
    default:
      break;
  }
  
}
export default Detail