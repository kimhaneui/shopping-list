import {Navbar, Container, Nav} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes,Route,useNavigate } from 'react-router-dom';

import data from './data.js';
import Detail from './routes/Detail.js'
import About from './routes/About.js'

function App() {
  let [shoes, shoesUpdate] = useState(data);
  let navigate = useNavigate();
  useEffect(() => {
  fetch('https://fakestoreapi.com/products')
  .then(res=>res.json())
  .then(json=>{shoesUpdate(json)})
      .catch(error => console.error(error));
  }, []);
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
        <Nav className="me-auto">
        <button onClick={()=>{ navigate('/') }}>Home</button> 
        <button onClick={()=>{ navigate('/detail') }}>상세페이지</button>
        <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link>
        </Nav>
        </Container> 
      </Navbar>
     
      <Routes>
        <Route path="/" element={ 
          <>
          <div className="main-bg"></div>
          <div className="container">
            <div className="row">          
              {
                shoes.map((a,i)=>{
                  return <Card shoes={shoes[i]} i={i+1}></Card>
                })
              }
            </div>
          </div>
          </>
         } />
        <Route path="/detail" element={ <Detail shoes={shoes}/> }/> 
        <Route path="/about" element={ <About/>} />
        <Route path="*" element={ <div>없는페이지임</div> } />
      </Routes>
    </div>
  )
}

function Card(props){
  return (
    <div className="col-md-4">
    <img src={props.shoes.image} width="80%" />
    <h4>{ props.shoes.title }</h4>
    <p>{ props.shoes.price }</p>
  </div>
  )
}

export default App;
