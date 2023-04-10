import {Navbar, Container, Nav,InputGroup,Button,Form} from 'react-bootstrap'
import {useState,useEffect,createContext} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Routes,Route,useNavigate } from 'react-router-dom';
import {useQuery} from 'react-query'
import data from './data.js';
import Detail from './routes/Detail.js'
import About from './routes/About.js'
import Cart from './routes/Cart.js'

export let StockContext = createContext();

function App() {
  let [shoes, shoesUpdate] = useState(data);
  let [btn , btnUpdate] = useState(1);
  let navigate = useNavigate();
  let [stock, stockUpdate] = useState([10,11,12]);
  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ return a.data })
  )
  //Profiler 성능측정 


  useEffect(() => {
  fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  .then(json=>{shoesUpdate(json)})
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    let list = localStorage.getItem('watched')
    if(list.length === 0){
      localStorage.setItem('watched', JSON.stringify([]))
    }
    
    }, []);

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
        <Nav className="me-auto">
        <Nav.Link onClick={()=>{ navigate('/home') }}>Home</Nav.Link>
        <Nav.Link onClick={()=>{ navigate('/cart') }}>장바구니</Nav.Link>
        <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link>
        </Nav>
        </Container> 
      </Navbar>
     
      <Routes>
      <Route path="/" element={
        <div className="login">
          <div className='full' >
          <InputGroup>
            <InputGroup.Text id="basic-addon1" >ID</InputGroup.Text>
            <Form.Control
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          </div>
          <div className='full' >
          <InputGroup>
          <InputGroup.Text id="basic-addon1">PW</InputGroup.Text>
            <Form.Control
              placeholder="PassWord"
              aria-label="PassWord"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          </div>
        </div>
      }></Route>
        <Route path="/home" element={ 
          <>
           <div>
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </div>
          <div className="main-bg"></div>
          <div className="container">
            <div className="row">          
              {
                shoes.map((a,i)=>{
                  return <Card shoes={shoes[i]} i={i+1}></Card>
                })
              }
            </div>
            <button onClick={()=>{
              btnUpdate(btn + 1);
              if(btn === 3){
                alert('3번이상')
              }
              axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
                let copy = [...shoes, ...결과.data]
                shoesUpdate(copy)
              })
              .catch(()=>{
                console.log('fail')
              })
            }}>버튼</button>
          </div>
          </>
         } />
        <Route path="/detail/:id" element={ 
          <StockContext.Provider value={{stock,shoes}}>
             <Detail shoes={shoes}/>
          </StockContext.Provider>
         }/> 
        <Route path="/cart" element={ <Cart/>} />
        <Route path="/about" element={ <About/>} />
        <Route path="*" element={ <div>404</div> } />
      </Routes>
    </div>
  )
}

function Card(props){
  let navigate = useNavigate();
  return (
    <div className="col-md-4" onClick={()=>{navigate(`/detail/${props.shoes.id}`)}}>
    <img src={props.shoes.image} width="80%" />
    <h4>{ props.shoes.title }</h4>
    <p>{ props.shoes.price }</p>
  </div>
  )
}

export default App;