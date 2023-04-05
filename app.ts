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
  recipeService: RecipeService | null = null;
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
    this.getRandomRecipe(12);
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
    //set event listener for random recipe button
    let searchButton = document.getElementById('buttonSearchRecipe');
    if (searchButton) {
      searchButton.addEventListener('click', async (event: MouseEvent) => {
        await this.searchRecipe(event);
      });
    }
  }

  async getRandomRecipe(n: number) {
    if(n == 1){
      console.log('getRandomRecipe', n);
      let recipes: IRecipe[] = []
      if(this.recipeService != null){
        recipes= this.recipesForTheDay = await this.recipeService.getRandomRecipe(n);
      }
      else{
        console.log('recipeService is null');
      }
      console.log('recipes view what what', recipes);
      this.openRecipeView(null,recipes[0]);
      console.log('recipes view what what part 2 ^_____^');
      let foodForTheDayHeading = document.getElementById('foodForTheDay');
      if(foodForTheDayHeading) foodForTheDayHeading.hidden = true;
    }
    else{
      console.log('getRandomRecipe', n);
      if(this.recipeService != null){
        let recipes: any = this.recipesForTheDay = await this.recipeService.getRandomRecipe(n);
      }
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
      'click #buttonSearchRecipe': 'searchRecipe'
    };
  }

  async searchRecipe(event: MouseEvent) {
    event.preventDefault();
    console.log('searchRecipe');
    let searchInput = document.getElementById('searchInput') as HTMLInputElement;
    console.log('searchInput', searchInput);
    if (searchInput) {
      if(searchInput.value == ''){
        console.log('searchInput.value', searchInput.value);
        this.collection = new RecipeCollection(this.recipesForTheDay);
        this.render();
      }
      else{
        this.searchString = searchInput.value;
        if(this.recipeService == null) return;
        this.searchedRecipes = await this.recipeService.searchRecipe(this.searchString);
        console.log('searchedRecipes', this.searchedRecipes);
        this.collection = new RecipeCollection(this.searchedRecipes);
        this.render();
      }
    }
  }

  goToHomePage(event: Event | null = null) {
    console.log('goToHomePage');
    let recipeCardsContainer = document.getElementById('recipe-cards');
    let recipeDetailsContainer = document.getElementById('recipe-details');
    let foodForTheDayHeading = document.getElementById('foodForTheDay');
    if (recipeCardsContainer) {
      recipeCardsContainer.hidden = false;
      if(recipeDetailsContainer && foodForTheDayHeading){
        recipeDetailsContainer.hidden = true;
        foodForTheDayHeading.hidden = false;
      }
    }
  }

  openRecipeView(event: Event| null, recipeInput: IRecipe| null = null) {
    let foodForTheDayHeading = document.getElementById('foodForTheDay');
    if(foodForTheDayHeading) foodForTheDayHeading.hidden = true;
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
    // this.$el.on('click', '#buttonSearchRecipe', this.searchRecipe.bind(this));
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

// checkpoint for search
