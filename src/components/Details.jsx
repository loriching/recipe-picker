import { Link, useParams } from "react-router-dom";

const Details = ({filteredRecipes}) => {
    const { id } = useParams();
    const numericId = parseInt(id, 10);
    console.log({id});

    let recipe = filteredRecipes.find(recipe => recipe.id === numericId);

    return (
        <>
            <div>
                <h2>{recipe.title}</h2>
                <p>This dish has:</p>
                <ul>
                    <li>{recipe.calories} calories,</li>
                    <li>{recipe.carbs} of carbohydrates,</li>
                    <li>{recipe.protein} of protein,</li>
                    <li>and {recipe.fat} of fat</li>
                </ul>
                <br/>
                <h4>What this dish looks like:</h4>
                <img src={recipe.image} alt={`Image of ${recipe.title}`}></img>
            </div>

            <h3>Click below to go back</h3>
            <Link to="/">BACK TO DASHBOARD</Link>
        </>
    );
};

export default Details;