import React from 'react';  
import { Link } from 'react-router-dom';  
import recipes from './recipes';  

const Menu = () => {  
    return (  
        <div className="menu-container">  
            <h2>All Recipes</h2>  
            {recipes.map((recipe) => (  
                <div key={recipe.id}>  
                    <h3>  
                        <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: 'blue' }}>  
                            {recipe.name}  
                        </Link>  
                    </h3>  
                    <p><strong>Kcal:</strong> {recipe.kcal}</p>  
                    <p><strong>Carbohydrates:</strong> {recipe.carbohydrates}</p>  
                </div>  
            ))}  
        </div>  
    );  
};  

export default Menu;

