console.log("The app works");

import { Model } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import { RecipeCollection } from '../../collection/recipe.collection';
import { IRecipe, RecipeService } from '../../services/Recipe';
import { RecipeView } from '../../views/recipe.view';


export class RecipeViewPage extends Model {
  searchString: string = ''
  recipeForTheDay: IRecipe[] = []
  recipeService: RecipeService;
  $el: JQuery<HTMLElement>;
  recipe: IRecipe;

  constructor( recipe: IRecipe){
    super();
    this.recipeService = new RecipeService();
    this.$el = $();
    this.recipe = recipe;
    console.log('recipe', recipe)
  }

  showRecipe(recipe: IRecipe){
    let recipeTemplate = _.template($('#recipe-template').html());
    let recipeHTML = recipeTemplate({recipe: recipe});
    let recipeContainer = document.getElementById('recipe-container');
    if(recipeContainer) recipeContainer.innerHTML = recipeHTML;
  }
}
// console.log('testing testing')

