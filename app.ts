console.log("The app works");

import Backbone, { Model } from 'backbone';
import {IRecipe, RecipeService} from './src/services/Recipe'
import { RecipeCollection } from './src/collection/recipe.collection';
import $ from 'jquery';
import _ from 'underscore';
class HomePageView extends Backbone.View {
  searchString: string = ''
  recipesForTheDay: IRecipe[] = []
  recipeService: RecipeService;
  $el: JQuery<HTMLElement>;

  constructor( ){
    super();
    this.recipeService = new RecipeService();
    this.$el = $();

    this.getRandomRecipe(3)
  }

  async getRandomRecipe(n: number) {
    console.log('getRandomRecipe', n)
    let recipes: any = await this.recipeService.getRandomRecipe(n);
    let recipeCollection = new RecipeCollection(recipes.recipes);
    let recipeCollectionView = this;
    recipeCollectionView.render();
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({recipes: recipeCollection.toJSON()});
    let recipeContainer = document.getElementById('recipe-cards');
    if(recipeContainer) recipeContainer.innerHTML = recipeHTML;
  }

  events() {
    return {
      'click .card': 'openRecipeView'
    };
  }

  openRecipeView(e: JQuery.Event) {
    console.log('recipe clicked', e);
    let recipeId = $((e as any).currentTarget).data('recipe-id');
    let recipe = this.collection.get(recipeId);
    // Code to change the body of the html file
  }

  render() {
    if(!this.collection) return this;
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({recipes: this.collection.toJSON()});
    let recipeContainer = document.getElementById('recipe-cards');
    if(recipeContainer) recipeContainer.innerHTML = recipeHTML;
    return this;
  }
}

let home = new HomePageView()