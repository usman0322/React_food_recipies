import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";


import React from 'react'

function Recipe() {
    const [details, setDetails] = useState({});
    const [activeTab, setActivetab] = useState('instructions')

    let params = useParams();

    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
        const detailsData = await data.json();
        console.log(detailsData);
        setDetails(detailsData)
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])


    return (
        <DeatailsWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />


            </div>

            <div>
                {/* <Info> */}
                <div style={{ display: 'flex', marginLeft: '20px' }}>
                    <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActivetab('instructions')}>Instructions</Button>
                    <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActivetab('ingredients')}>Ingredients</Button>
                </div>

                <div style={{ marginLeft: '50px' }}>
                    {activeTab === 'instructions' && (
                        <>
                            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                        </>
                    )}

                    {activeTab === 'ingredients' && (
                        <ul>
                            {details.extendedIngredients &&
                                details.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id}> {ingredient.original}</li>
                                ))}
                        </ul>
                    )}
                </div>

            </div>
            {/* </Info> */}

        </DeatailsWrapper>
    )
}

const DeatailsWrapper = styled.div`
margin-top:10rem;
margin-bottom:5rem;
display:flex;

.active{
    background:Linear-gradient(35deg , #494949 , #313131);
    color:white;
}

h2{
    margin-bottom:2rem
}
li{
    font-size:1.2rem;
    line-height:2.5rem
}

ul{
    margin-top:2rem
}
`;

const Button = styled.button`
padding:1rem 2rem;
color:#313131;
background:white;
border:2px solid black;
margin-right:2rem;
font-weight:600;

`;



export default Recipe