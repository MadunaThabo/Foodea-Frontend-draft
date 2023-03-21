import Backbone from "backbone";

export class RecipeModel extends Backbone.Model{
    defaults() {
        return {
            aggregateLikes: 0 ,
            analyzedInstructions: [
                {
                    name: '',
                    steps: [
                        {
                            number: 0,
                            step: '',
                            ingredients: [],
                            equipment: [
                                {
                                    id: 0,
                                    name: '',
                                    localizedName: '',
                                    image: '',
                                    temperature: {
                                        number: 0,
                                        unit: ''
                                    }
                                }
                            ],
                            length: {
                                number: 0,
                                unit: ''
                            }
                        }
                    ]
                }
            ],
            cheap: false,
            cookingMinutes: 0,
            creditsText: '',
            cuisines: [],
            dairyFree: true,
            diets: [],
            dishTypes: [],
            extendedIngredients: [
                {
                    id: 0,
                    aisle: '',
                    image: '',
                    consistency: '',
                    name: '',
                    nameClean: '',
                    original: '',
                    originalName: '',
                    amount: 0,
                    unit: '',
                    meta: [],
                    measures: {
                        us: {
                            amount: 0,
                            unitShort: '',
                            unitLong: ''
                        },
                        metric: {
                            amount: 0,
                            unitShort: '',
                            unitLong: ''
                        }
                    }
                }
            ],
            gaps: '',
            glutenFree: true,
            healthScore : 0,
            id: 0,
            image: '',
            imageType: '',
            instructions : '',
            license: '',
            lowFodmap: false,
            occasions: [],
            originalId: null,
            preparationMinutes: 0,
            pricePerServing: 0.0,
            servings: 0,
            sourceName: '',
            sourceUrl: '',
            spoonacularSourceUrl: '',
            summary: '',
            sustainable: false,
            title:  '',
            vegan: false,
            vegetarian: false,
            veryHealthy: false,
            veryPopular: false,
            weightWatcherSmartPoints: 0,
            equipment: [
                {
                    id: 0,
                    name: '',
                    localizedName: '',
                    image: '',
                    temperature: {
                        number: 0,
                        unit: ''
                    }
                }
            ],
        }
    }
}
