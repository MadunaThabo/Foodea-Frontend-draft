import Backbone, { Router } from 'backbone';
import { IRecipe, RecipeService } from './src/services/recipe.service';
import { RecipeCollection } from './src/collection/recipe.collection';
import $, { event } from 'jquery';
import _ from 'underscore';
import { RecipeViewPage } from './src/pages/recipe-view-page/recipe-view-page';

export class HomePageView extends Backbone.View {
  collection!: RecipeCollection;
  searchString: string = '';
  recipesForTheDay: IRecipe[] = [];
  searchedRecipes: IRecipe[] = [];
  recipesToShow: IRecipe[] = [];
  recipeService: RecipeService;
  tempRecipe: IRecipe | null = null;
  $el: JQuery<HTMLElement>;

  constructor() {
    super();
    this.recipeService = new RecipeService();
    this.$el = $('#recipe-cards');
    
    this.initialize();
  }

  initialize() {
    //get recipes for the day
    this.getRandomRecipe(2);
    //set the event listener for home button
    let homeButton = document.getElementById('buttonHomePage');
    if (homeButton) {
      homeButton.addEventListener('click', async () => {
        this.goToHomePage();
      });
    }
    //set event listener for random recipe button
    let randomButton = document.getElementById('buttonRandomRecipe');
    if (randomButton) {
      randomButton.addEventListener('click', async () => {
        await this.getRandomRecipe(1);
      });
    }
  }

  async getRandomRecipe(n: number) {
    if(n == 1){
      console.log('getRandomRecipe', n);
      let recipes: any = await this.recipeService.getRandomRecipe(n);
      console.log('recipes view what what', recipes);
      this.openRecipeView(null,recipes[0]);
      console.log('recipes view what what part 2 ^_____^');
    }
    else{
      console.log('getRandomRecipe', n);
      let recipes: any = 
      this.recipesForTheDay = await this.recipeService.getRandomRecipe(n);
      let recipeCollection = new RecipeCollection(this.recipesForTheDay);
      this.collection = recipeCollection;
      this.render();
      // let recipeTemplate = _.template($('#recipe-card-template').html());
      // let recipeHTML = recipeTemplate({ recipes: recipeCollection.toJSON() });
      // let recipeContainer = document.getElementById('recipe-cards');
      // if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
    }
  }

  events(): Backbone.EventsHash {
    return {
      'click .card': 'openRecipeView',
      'click #buttonRandom': 'getRandomRecipe',
      'click #buttonHomePage': 'goToHomePage',
      'click #buttonRandomRecipe': 'searchRecipe'
    };
  }

  async searchRecipe(event: Event) {
    let searchInput = document.getElementById('searchInput') as HTMLInputElement;
    console.log('searchInput', searchInput);
    if (searchInput) {
      if(searchInput.value == ''){
        this.collection = new RecipeCollection(this.recipesForTheDay);
        this.render();
      }
      else{
        this.searchString = searchInput.value;
        this.searchedRecipes = await this.recipeService.searchRecipe(this.searchString);
        console.log('searchedRecipes', this.searchedRecipes);
        this.collection = new RecipeCollection(this.searchedRecipes);
        this.render();
      }
    }
  }

  goToHomePage() {
    let recipeCardsContainer = document.getElementById('recipe-cards');
    let recipeDetailsContainer = document.getElementById('recipe-details');
    if (recipeCardsContainer) {
      recipeCardsContainer.hidden = false;
      if(recipeDetailsContainer){
        recipeDetailsContainer.hidden = true;
      }
    }
  }

  openRecipeView(event: Event| null, recipeInput: IRecipe| null = null) {
    if(recipeInput){
      console.log('recipeInput', recipeInput);
      let recipeCollection = new RecipeCollection([recipeInput]);
      let recipeView = new RecipeViewPage(recipeCollection.at(0));
      recipeView.render();
    }
    else{
      const currentTarget = (event as any).currentTarget;
      if (!currentTarget) return;
      let recipeId = $(currentTarget).attr('id') as string;
      let recipe = this.collection.get(recipeId);
      if (!recipe) return;
      console.log('recipe', recipe.attributes);
      let recipeView = new RecipeViewPage(recipe);
      recipeView.render();
    }
    
  }

  render() {
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({ recipes: this.collection.toJSON() });
    let recipeContainer = document.getElementById('recipe-cards');
    if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
    this.delegateEvents();
    this.$el.on('click', '.card img', this.openRecipeView.bind(this));
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
