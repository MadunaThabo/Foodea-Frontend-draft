import { Model } from 'backbone';

export interface IRecipe{
    aggregateLikes: number
    analyzedInstructions: []
    cheap: boolean
    cookingMinutes: number
    creditsText: string
    cuisines: []
    dairyFree: boolean
    diets: []
    dishTypes: []
    extendedIngredients: []
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
}

export class RecipeService extends Model{
    constructor(){
        super({
            aggregateLikes: 0 ,
            analyzedInstructions: [],
            cheap: false,
            cookingMinutes: 0,
            creditsText: '',
            cuisines: [],
            dairyFree: true,
            diets: [],
            dishTypes: [],
            extendedIngredients: [],
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
        })
    }

    getRandomRecipe(n: number){
        // url: any = 'https://localhost:7008/api/users/random';
        // fetchData() {
        //   this.fetch({
        //     dataType: 'json'
        //   }).then(() => {
        //     console.log(this.toJSON());
        //   });
        // }
        return {"confusion": n}
    }
}

var recipe = new RecipeService()
console.log(recipe)