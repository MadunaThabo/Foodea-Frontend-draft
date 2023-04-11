import { Model } from 'backbone';
import { forEach } from 'underscore';

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
            equipment: [],
        })
    }

    async getRandomRecipe(n: number): Promise<IRecipe[]> {
        const url = `https://localhost:7008/api/Recipes/random?number=${n}`;
      
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.log(`Server responded with status code ${response.status}`);
          return [];
        }
      
        const recipe = await response.json();
        console.log(recipe)
        return recipe.recipes as IRecipe[];
      }
      

    getRecipeById(id: number){
        //TODO: Get recipe by it's id
        return this.getRandomRecipe(1);
    }

    getEquipment(recipes: IRecipe[]){
        for (var recipe of recipes) {
            for(var instruction of recipe.analyzedInstructions){
                for(var step of instruction.steps){
                    recipe.equipment.push(...step.equipment);
                }
            }
        }
    }

    async searchRecipe(query: string): Promise<IRecipe[]> {
        console.log('searching ', query)
        const url = `https://localhost:7008/api/Recipes/search/${query}`;
        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        if (!response.ok) {
          console.log(`Server responded with status code ${response.status}`);
          return [];
        }
        const recipe = await response.json();
        return recipe.recipes as IRecipe[];
      }
      
}

var recipe = new RecipeService()
console.log(recipe)