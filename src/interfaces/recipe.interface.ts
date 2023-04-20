export interface IRecipe{
    aggregateLikes: number
    analyzedInstructions: [
        {
            name: string
            steps: [
                {
                    number: number
                    step: string
                    ingredients: []
                    equipment: [
                        {
                            id: number,
                            name: string,
                            localizedName: string,
                            image: string,
                            temperature: {
                                number: 0,
                                unit: string
                            }
                        }
                    ]
                    length: {
                        number: number
                        unit: string
                    }
                }
            ]
        }
    ]
    cheap: boolean
    cookingMinutes: number
    creditsText: string
    cuisines: []
    dairyFree: boolean
    diets: []
    dishTypes: []
    extendedIngredients: [
        {
            id: 0,
            aisle: string,
            image: string,
            consistency: string,
            name: string,
            nameClean: string,
            original: string,
            originalName: string,
            amount: 0,
            unit: string,
            meta: [],
            measures: {
                us: {
                    amount: 0,
                    unitShort: string,
                    unitLong: string
                },
                metric: {
                    amount: 0,
                    unitShort: string,
                    unitLong: string
                }
            }
        }
    ]
    gaps: string
    glutenFree: boolean
    healthScore: number
    id: number
    image: string
    imageType: string
    instructions: string
    license: string
    lowFodmap: boolean
    occasions: []
    originalId: null
    preparationMinutes: number
    pricePerServing: number
    servings: number
    sourceName: string
    sourceUrl: string
    spoonacularSourceUrl: string
    summary: string
    sustainable: boolean
    title: string
    vegan: boolean
    vegetarian: boolean
    veryHealthy: boolean
    veryPopular: boolean
    weightWatcherSmartPoints: number
    equipment: [
        {
            id: number,
            name: string,
            localizedName: string,
            image: string,
            temperature: {
                number: 0,
                unit: string
            }
        }
    ]
}