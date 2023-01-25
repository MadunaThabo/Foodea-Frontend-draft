console.log("The app works");

import { Model } from 'backbone';
import {IRecipe, RecipeService} from './Recipe'
import { RecipeCollection } from './Colllection/recipe.collection';
import { RecipeModel } from './Models/recipe.model';
import { RecipeView } from './Views/recipe.view';

class Home extends Model {
  searchString: string = ''
  recipeForTheDay: IRecipe[] = []
  recipeService: RecipeService;

  constructor( ){
    super();
    this.recipeService = new RecipeService();
  }

  async getRandomRecipe(n: number) {
    let recipes: any = await this.recipeService.getRandomRecipe(n)
    console.log('recipes', recipes.recipes[0].title)
    var recipe2 = new RecipeModel({
      title: 'Spaghetti and Meatballs',
      ingredients: ['spaghetti', 'ground beef', 'bread crumbs', 'eggs', 'salt', 'pepper'],
      instructions: 'Boil the spaghetti according to package instructions. In a separate pan, brown the ground beef and form into meatballs. Add the meatballs to the spaghetti and serve.',
      image: recipes.recipes[0].image
    });
        
    var recipeView = new RecipeView({
      el: '#recipe-container',
      model: recipe2
    });
    
    recipeView.render();
    
    $(document).ready(function(){
      var recipeView = new RecipeView({
        el: '#recipe-template',
        model: recipe2
      });
      
      recipeView.render();
      $('#recipe-template').append(recipeView.$el);  
      console.log('Recipe view..........')
    });
  }

}
var home = new Home()
home.getRandomRecipe(1)
// console.log('testing testing',home.getRandomRecipe(3), home.getRandomRecipe(3).confusion)
console.log('testing testing')

