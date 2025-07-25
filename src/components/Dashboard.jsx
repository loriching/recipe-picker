import { LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import RecipeRow from "./RecipeRow";
import "./Dashboard.css";

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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ background: "#fff", padding: "10px", border: "1px solid #ccc" }}>
        <p style={{color: "black"}}><strong>{label}</strong></p>
        {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}> {entry.name}:{entry.name === "Calories" ? entry.value : ` ${entry.value}g`} </p>
        ))}
      </div>
    );
  }

  return null;
};

const colors = ["purple", "orange", "brown", "green"];

const colorMap = {
  calories: "purple",
  carbs: "orange",
  protein: "brown",
  fat: "green"
};

const CustomTooltip2 = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const nutrientName = payload[0].payload.name; // reliable field
    const value = payload[0].value;
    const color = colorMap[nutrientName.toLowerCase()] || "black";

    const isCalories = nutrientName.toLowerCase() === "calories";
    const unit = isCalories ? "kcal" : "g";

    return (
      <div
        className="custom-tooltip"
        style={{ background: "#fff", padding: "10px", border: "1px solid #ccc" }}
      >
        <p style={{ color: "black" }}>
          <strong>{nutrientName}</strong>
        </p>
        <p style={{ color }}>
          {nutrientName}: {value} {unit}
        </p>
      </div>
    );
  }

  return null;
};

const Dashboard = ({ recipes }) => {
    const parsedRecipes = recipes.map(r => ({...r, protein: parseGrams(r.protein),
        carbs: parseGrams(r.carbs),
        fat: parseGrams(r.fat)
    }));

    const averageData = [
        { name: "Calories", value: averageCalories(recipes)},
        { name: "Carbohydrates", value: averageCarbs(recipes)},
        { name: "Fat", value: averageFat(recipes)},
        { name: "Protein", value: averageProtein(recipes)},
    ]

    return (
        <>
            <table className="table">
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

            <div className="statistics-text">
              <h3 className="stats-titles">Average Calories in these Meals:</h3>
              <p className="stats-text">{averageCalories(recipes)} kcal</p>

              <h3 className="stats-titles">Average Carbohydrates in these Meals:</h3>
              <p className="stats-text">{averageCarbs(recipes)} grams</p>

              <h3 className="stats-titles">Average Protein in these Meals:</h3>
              <p className="stats-text">{averageProtein(recipes)} grams</p>

              <h3 className="stats-titles">Average Fat in these Meals:</h3>
              <p className="stats-text">{averageFat(recipes)} grams</p>
            </div>
            
            <div className="graph">
                <h3 className="chart-title">Relationships between Nutrient Levels</h3>
                <p className="chart-subtitle">Hover over the dots to see the nutrients in each meal.</p>
                <div className="graph-box">
                <LineChart width={500} height={300}
                    data={parsedRecipes.slice(0, 10)}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis hide="true" dataKey="title" />
                    <YAxis type="number" />
                    <Tooltip content={<CustomTooltip />}/>
                    <Legend />
                    <Line type="monotone" dataKey="carbs" name="Carbohydrates (g)" stroke="orange" />
                    <Line type="monotone" dataKey="protein" name="Protein (g)" stroke="brown" />
                    <Line type="monotone" dataKey="fat" name="Fats (g)" stroke="green" />
                </LineChart>
                </div>
            </div>

            <div className="graph">
                <h3 className="chart-title">Average Nutrients in These Recipes</h3>
                <p className="chart-subtitle">Hover over the bars to see the average number of <br></br>nutrients in all recipes that match the filters and/or search.</p>
                <div className="graph-box">
                <BarChart width={500} height={300} data={averageData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" />
                    <Tooltip content={<CustomTooltip2/>}/>
                    <Bar dataKey="value">
                        {
                            averageData.map((entry, index) => (<Cell key={`cell-${index}`} fill={colors[index]} />))
                        }
                    </Bar>
                </BarChart>
                </div>
            </div>
        </>
    );
};

export default Dashboard;