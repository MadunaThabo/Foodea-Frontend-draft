import { Model } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

export class RecipeViewPage extends Model {
  searchString: string = ''
  recipeForTheDay: RecipeModel[] = []
  recipeService: RecipeService;
  $el: JQuery<HTMLElement>;
  recipe: RecipeModel;

  constructor( recipe: RecipeModel){
    super();
    this.recipeService = new RecipeService();
    this.$el = $();
    this.recipe = recipe;
    console.log('recipe', recipe)
  }

  render(){
    let recipeTemplate = _.template($('#recipe-details-template').html());
    let recipeHTML = recipeTemplate({recipe: this.recipe.toJSON()});
    let recipeDetailsContainer = document.getElementById('recipe-details');
    let recipeCardsContainer = document.getElementById('recipe-cards');
    if(recipeCardsContainer){
      recipeCardsContainer.hidden = true;
    }
    if(recipeDetailsContainer){
      recipeDetailsContainer.innerHTML = recipeHTML;
      recipeDetailsContainer.hidden = false;
    } 
  }
}

