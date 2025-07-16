import { useEffect, useState } from "react";

const RecipeRow = ({recipe}) => {
    
    return (
        <tr>
            <td>{recipe.title}</td>
            <td>{recipe.calories}</td>
            <td>{recipe.carbs}</td>
            <td>{recipe.protein}</td>
            <td>{recipe.fat}</td>
        </tr>

    );
};

export default RecipeRow;