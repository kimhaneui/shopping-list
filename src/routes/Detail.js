import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {useState,useEffect} from 'react'

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : black;
  padding : 10px;
`;

function Detail(props){
  let {id} = useParams();
  console.log(id,props);
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let product = props.shoes.find(function(x){
    return x.id == id
  });
  useEffect(() => {
    let a = setTimeout(()=>{setAlert(false)},2000)
    return ()=>{
      clearTimeout(a)
    }
  },[count])
  useEffect(()=>{}) // 재 랜더링 마다 실행
  useEffect(()=>{},[]) //mount 1회 토드실행
  useEffect(()=>{},['변수']) //변수가 바뀔때마다 실행
  useEffect(()=>{ // useEffect 실행전에 뭔가 실행하고 싶으면
    return()=>{

    }
  },[]) 
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
            <button className="btn btn-danger">주문하기</button>
          </div>
        <div>
        <YellowBtn bg="orange">오렌지색 버튼임</YellowBtn>
        <YellowBtn bg="blue">파란색 버튼임</YellowBtn>
        </div>
        </div> 
      </div> 
    )
}
export default Detail