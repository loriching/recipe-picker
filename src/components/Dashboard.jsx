import RecipeRow from "./RecipeRow";

const parseGrams = (value) => {
    if (typeof value !== "string") return 0;
    return parseFloat(value.trim().replace('g', '')) || 0;
};

const averageCalories = (r) => {
    if (!r || r.length === 0) return 0;
    const sum = r.reduce((total, item) => total + item.calories, 0);
    return Math.round(sum / r.length);
}

const averageCarbs = (r) => {
    if (!r || r.length === 0) return 0;
    const sum = r.reduce((total, item) => total + parseGrams(item.carbs), 0);
    return Math.round(sum / r.length);
}

const averageProtein = (r) => {
    if (!r || r.length === 0) return 0;
    const sum = r.reduce((total, item) => total + parseGrams(item.protein), 0);
    return Math.round(sum / r.length);
}

const averageFat = (r) => {
    if (!r || r.length === 0) return 0;
    const sum = r.reduce((total, item) => total + parseGrams(item.fat), 0);
    return Math.round(sum / r.length);
}

const Dashboard = ({ recipes }) => {
    return (
        <>
            <table>
            <thead>
                <tr>
                <th>Dish</th>
                <th>Calories</th>
                <th>Carbohydrates (g)</th>
                <th>Protein (g)</th>
                <th>Fat (g)</th>
                <th>View Image</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((recipe) => (
                <RecipeRow key={recipe.id} recipe={recipe} />
                ))}
            </tbody>
            </table>

            <h3>Average Calories in these Meals:</h3>
            <p>{averageCalories(recipes)} kcal</p>

            <h3>Average Carbohydrates in these Meals:</h3>
            <p>{averageCarbs(recipes)} grams</p>

            <h3>Average Protein in these Meals:</h3>
            <p>{averageProtein(recipes)} grams</p>

            <h3>Average Fat in these Meals:</h3>
            <p>{averageFat(recipes)} grams</p>
        </>
    );
};

export default Dashboard;