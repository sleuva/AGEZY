// @desc    Get crop recommendations
// @route   POST /api/advisory/crop-recommendation
exports.getCropRecommendation = async (req, res) => {
    const { soilType, season, location } = req.body;

    // Mock AI Logic - In a real app, this would call an AI service or complex algorithm
    let recommendations = [];

    if (season === 'Kharif') {
        if (soilType === 'Alluvial') {
            recommendations = [
                { crop: 'Rice', suitability: 'High', reason: 'Abundant water and fertile soil.' },
                { crop: 'Maize', suitability: 'Medium', reason: 'Good drainage required.' }
            ];
        } else if (soilType === 'Black') {
            recommendations = [
                { crop: 'Cotton', suitability: 'High', reason: 'Excellent moisture retention.' },
                { crop: 'Soybean', suitability: 'High', reason: 'Suitable for heavy soils.' }
            ];
        }
    } else if (season === 'Rabi') {
        if (soilType === 'Alluvial') {
            recommendations = [
                { crop: 'Wheat', suitability: 'High', reason: 'Cool climate favors growth.' },
                { crop: 'Mustard', suitability: 'Medium', reason: 'Requires less water.' }
            ];
        }
    }

    // Fallback if no specific logic matches
    if (recommendations.length === 0) {
        recommendations = [
            { crop: 'Vegetables', suitability: 'Generic', reason: 'Short duration crops recommended for this condition.' }
        ];
    }

    res.json({
        location,
        season,
        soilType,
        recommendations
    });
};
