import { Link } from "react-router-dom";

const RecipeRow = ({recipe}) => {
    return (
        <tr>
            <td>{recipe.title}</td>
            <td>{recipe.calories}</td>
            <td>{recipe.carbs}</td>
            <td>{recipe.protein}</td>
            <td>{recipe.fat}</td>
            <td><Link to={`/details/${recipe.id}`}>🔗</Link></td>
        </tr>
    );
};

export default RecipeRow;