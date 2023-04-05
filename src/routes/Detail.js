import { useParams } from 'react-router-dom'
import styled from 'styled-components'

let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : black;
  padding : 10px;
`;

function Detail(props){
  let {id} = useParams();
  let product = props.shoes.find(x=>x.id === id);
 
  return(
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
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