import Backbone, { Router } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import { RecipeCollection } from '../collection/recipe.collection';
import { RecipeViewPage } from '../pages/recipe-view-page/recipe-view-page';
import { IRecipe, RecipeService } from '../services/recipe.service';

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
    this.render()
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
    const currentTarget = (event as any).currentTarget;
    if (!currentTarget) return;
    let recipeId = $(currentTarget).attr('id') as string;
    let recipe = this.collection.get(recipeId);
    if (!recipe) return;
    console.log('recipe', recipe.attributes);
    let recipeView = new RecipeViewPage(recipe);
    recipeView.render();
  }

  render() {
    console.log('rendering the home page view');
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