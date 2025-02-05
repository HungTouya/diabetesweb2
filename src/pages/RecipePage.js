import React from 'react';  
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate  
import recipes from './recipes';  
import Recipe from './Recipe';  

const RecipePage = () => {  
    const { id } = useParams(); // Get the recipe ID from the URL  
    const navigate = useNavigate(); // Initialize useNavigate  
    const recipe = recipes.find(r => r.id === parseInt(id)); // Find the recipe by ID  

    if (!recipe) {  
        return <h2>Recipe not found</h2>; // Handle case where recipe does not exist  
    }  

    return (  
        <div>  
            <h1>{recipe.name}</h1>  
            <Recipe   
                kcal={recipe.kcal}  
                carbohydrates={recipe.carbohydrates}  
                ingredients={recipe.ingredients}  
                cookingInstructions={recipe.cookingInstructions}  
                tip={recipe.tip}  
            />  
            <button onClick={() => navigate('/menu')} style={buttonStyle}>  
                Return to Menu  
            </button>  
        </div>  
    );  
};  

// Optional inline style for the button  
const buttonStyle = {  
    marginTop: '20px',  
    padding: '10px 15px',  
    fontSize: '16px',  
    cursor: 'pointer',  
    backgroundColor: '#007bff',  
    color: 'white',  
    border: 'none',  
    borderRadius: '5px',  
};  

export default RecipePage;