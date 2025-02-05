import React, { useState } from 'react';  

const Recipe = ({ kcal, carbohydrates, ingredients, cookingInstructions, tip }) => {  
    const [rating, setRating] = useState(0);  

    const handleRatingChange = (e) => {  
        setRating(e.target.value);  
    };  

    return (  
        <div className="recipe-container">  
            <p><strong>Kcal:</strong> {kcal}</p>  
            <p><strong>Carbohydrates:</strong> {carbohydrates}</p>  
            <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>  
            <p><strong>How to Cook:</strong> {cookingInstructions}</p>  
            <p><strong>Tip:</strong> {tip}</p>  
            
            <div className="rating-section">  
                <h3>Rate this Recipe:</h3>  
                <select value={rating} onChange={handleRatingChange}>  
                    <option value="0">--Select Rating--</option>  
                    {[1, 2, 3, 4, 5].map((star) => (  
                        <option key={star} value={star}>{star}</option>  
                    ))}  
                </select>  
            </div>  
        </div>  
    );  
};  

export default Recipe;