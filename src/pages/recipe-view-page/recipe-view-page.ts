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
    console.log('rendering');
    let recipeTemplate = _.template($('#recipe-details-template').html());
    console.log('rendering2', this.recipe);
    let recipeHTML = recipeTemplate({recipe: this.recipe.toJSON()});
    console.log('rendering3');
    let recipeContainer = document.getElementById('recipe-cards');
    console.log('rendering4', recipeContainer);
    if(recipeContainer) recipeContainer.innerHTML = recipeHTML;
  }
}

