import "./InfoPage.css";

const InfoPage = () => {
    return (
        <div className="info-page">
            <h1 className="title-text">More Information</h1>

            <h2>API used:</h2>
            <p>This website uses the Spoonacular API to find recipes.</p>

            <h2>Purpose:</h2>
            <p>This tool is designed to help people meet their macro nutrient goals, find recipes based on ingredients they want, and develop a healthy relationship with food.</p>
            <p>It is <strong>NOT</strong> (currently) designed to find meals that limit certain nutrients, such as sodium or saturated fat.</p>

            <h2>Health Benefits of the Three Macronutrients:</h2>
            <ul>
                <li>Carbohydrates are the body's main fuel source and provide energy.</li>
                <li>Protein helps you feel full longer and increases muscle mass.</li>
                <li>Fats also help you feel full for longer, help let you know when you're full, and many are essential for your body.</li>
            </ul>
        </div>
    );
};

export default InfoPage;