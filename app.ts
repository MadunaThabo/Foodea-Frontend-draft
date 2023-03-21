import Backbone, { Router } from 'backbone';
import { IRecipe, RecipeService } from './src/services/recipe.service';
import { RecipeCollection } from './src/collection/recipe.collection';
import $ from 'jquery';
import _ from 'underscore';
import { RecipeViewPage } from './src/pages/recipe-view-page/recipe-view-page';

export class HomePageView extends Backbone.View {
  collection!: RecipeCollection;
  searchString: string = '';
  recipesForTheDay: IRecipe[] = [];
  recipeService: RecipeService;
  $el: JQuery<HTMLElement>;

  constructor() {
    super();
    this.recipeService = new RecipeService();
    this.$el = $('#recipe-cards');
    this.getRandomRecipe(3);
    this.initialize();
  }

  initialize() {
    console.log('initialize');
  }

  async getRandomRecipe(n: number) {
    console.log('getRandomRecipe', n);
    let recipes: any = await this.recipeService.getRandomRecipe(n);
    let recipeCollection = new RecipeCollection(recipes.recipes);
    this.collection = recipeCollection;
    this.render();
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({ recipes: recipeCollection.toJSON() });
    let recipeContainer = document.getElementById('recipe-cards');
    if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
    this.delegateEvents();
    this.$el.on('click', '.card img', this.openRecipeView.bind(this));
    
  }

  events(): Backbone.EventsHash {
    return {
      'click .card': 'openRecipeView',
    };
  }

  openRecipeView(event: Event) {
    // console.log('openRecipeView', event);
    const currentTarget = (event as any).currentTarget;
    if (!currentTarget) return;
    // console.log("currentTarget", currentTarget);
    let recipeId = $(currentTarget).attr('id') as string;
    // console.log('recipeId', recipeId, '\ncollection', this.collection);
    let recipe = this.collection.get(recipeId);
    if (!recipe) return;
    console.log('recipe', recipe.attributes);
    let recipeView = new RecipeViewPage(recipe);
    recipeView.render();
  }

  render() {
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({ recipes: this.collection.toJSON() });
    let recipeContainer = document.getElementById('recipe-cards');
    if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
    return this;
  }

  truncate(inputString: string, maxLength: number) {
    return (inputString.length > maxLength) ? inputString.slice(0, maxLength - 1) + '…' : inputString;
  }
}



$(document).ready(function () {
  let home = new HomePageView();
  home.delegateEvents();
});
