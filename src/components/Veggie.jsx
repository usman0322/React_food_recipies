import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';



function Veggie() {

  const [veggie, setVeggie] = useState([]);


  useEffect(() => {
    getVeggies();
  }, []);

  const getVeggies = async () => {

const check = localStorage.getItem('veggie');

if(check){
  setVeggie(JSON.parse(check))
}
else{
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&task=vegiterian`);
    const data = await api.json();

    localStorage.setItem('veggie' , JSON.stringify(data.recipes))
    console.log(data);

    setVeggie(data.recipes)
}


  
  }
  return (


    <div>

      <Wrapper>
        <h3>Our Veggies Picks</h3>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          gap:'5rem',
          drag:'free'
        }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card >
                  <p key={recipe.id}>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient/>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div
`
"margin:4rem 0rem"
`;

const Card = styled.div`
min-height:25rem;
border-radius:2rem;
overflow:hidden;
position:relative;

 img{
  border-radius:2rem;

  position:absolute;
  left:0;
  width:100%;
  height:50%;
  object-fit:cover;
 } 
 p{
  position:absolute;
  z-index:10;
  bottom:0%;
  left:50%;
  transform:translate(-50% , 0%);
  color:white;
  width:100%;
  text-align:center;
  font-weight:600;
  font-size:1rem;
  height:140%;
  display:flex;
  justify-content:center;
  align-items:center

 }
  

`;

const Gradient = styled.div`
z-index:3;
width:100%;
height:100%
position:absolute;
background:linear-gradient(rgba(0,0,0,0) , rgba(0,0,0,0.5))
`

export default Veggie


















