import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const calMarks = [
    {
        value: 0,
        label: "0",
    },
    {
        value: 2000,
        label: "2000"
    }
];

const fortyMarks = [
    {
        value: 0,
        label: "0",
    },
    {
        value: 40,
        label: "40"
    }
];

const FilterControls = ({filters, changeFilter}) => {
    return (
        <>
            <Typography gutterBottom>Minimum Calories</Typography>
            <Slider size="small" min={0} max={2000} valueLabelDisplay="auto" value={filters.calories} onChange={(_, value) => changeFilter("calories", value)} marks={calMarks} sx={{'& .MuiSlider-markLabel': {color: "white", fontSize: '0.8rem'}}}></Slider>

            <Typography gutterBottom>Minimum Carbohydrates (g)</Typography>
            <Slider size="small" min={0} max={40} valueLabelDisplay="auto" value={filters.carbs} onChange={(_, value) => changeFilter("carbs", value)} marks={fortyMarks} sx={{'& .MuiSlider-markLabel': {color: "white", fontSize: '0.8rem'}}}></Slider>

            <Typography gutterBottom>Minimum Protein (g)</Typography>
            <Slider size="small" min={0} max={40} valueLabelDisplay="auto" value={filters.protein} onChange={(_, value) => changeFilter("protein", value)} marks={fortyMarks} sx={{'& .MuiSlider-markLabel': {color: "white", fontSize: '0.8rem'}}}></Slider>

            <Typography gutterBottom>Minimum Fats (g)</Typography>
            <Slider size="small" min={0} max={40} valueLabelDisplay="auto" value={filters.fiber} onChange={(_, value) => changeFilter("fiber", value)} marks={fortyMarks} sx={{'& .MuiSlider-markLabel': {color: "white", fontSize: '0.8rem'}}}></Slider>
        </>
    );
    
}

export default FilterControls;