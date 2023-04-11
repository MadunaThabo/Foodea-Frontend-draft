import Backbone, { Router } from 'backbone';
import { IRecipe, RecipeService } from './src/services/recipe.service';
import { RecipeCollection } from './src/collection/recipe.collection';
import $, { event } from 'jquery';
import _ from 'underscore';
import { RecipeViewPage } from './src/pages/recipe-view-page/recipe-view-page';
import { AppRouter } from './app.router';

export class HomePageView extends Backbone.View {
  router: Backbone.Router;
  collection!: RecipeCollection;
  searchString: string = '';
  recipesForTheDay: IRecipe[] = [];
  searchedRecipes: IRecipe[] = [];
  recipesToShow: IRecipe[] = [];
  recipeService: RecipeService | null = null;
  tempRecipe: IRecipe | null = null;
  $el: JQuery<HTMLElement>;
  selectedPage = 1;

  constructor(options?: any) {
    super(options);
    this.recipeService = new RecipeService();
    this.$el = $('#recipe-cards');
    console.log('view1');
    this.initialize();
    this.router = options.router;
    console.log('view2');
  }

  initialize() {
    //get recipes for the day
    this.getRandomRecipe(72);
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
    // set event listener for ingredients link
    let ingredientsLink = document.getElementById('ingredientsLink');
    if (ingredientsLink) {
      ingredientsLink.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        this.router.navigate('/ingredients', {trigger: true});
      });
    }
  }

  async getRandomRecipe(n: number) {
    if(n == 1){
      console.log('getRandomRecipe', n);
      let recipes: IRecipe[] = []
      if(this.recipeService != null){
        this.recipesToShow = this.recipesForTheDay = await this.recipeService.getRandomRecipe(n);
      }
      else{
        console.log('recipeService is null');
      }
      console.log('recipes view what what', recipes);
      this.openRecipeView(null,recipes[0]);
      console.log('recipes view what what part 2 ^_____^');
    }
    else{
      console.log('getRandomRecipe', n);
      if(this.recipeService != null){
        this.recipesToShow = this.recipesForTheDay = await this.recipeService.getRandomRecipe(n);
      }
      let recipeCollection = new RecipeCollection(this.recipesForTheDay);
      this.collection = recipeCollection;
      
      this.render();
      this.updatePagination();
      
    }
  }

  events(): Backbone.EventsHash {
    return {
      'click .card': 'openRecipeView',
      // 'click #buttonRandom': 'getRandomRecipe',
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
        this.updatePagination();
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
    if (recipeCardsContainer) {
      recipeCardsContainer.hidden = false;
      if(recipeDetailsContainer){
        recipeDetailsContainer.hidden = true;
      }
    }
  }

  updatePagination() {
    let pagination = document.getElementById('pagination');
    if (pagination) {
      pagination.innerHTML = ''; // clear the pagination first
      
      let pageLimit = 12;
      let totalPages = Math.ceil(this.collection.size() / pageLimit);
      let currentPage = 1;
  
      // create previous button
      let previousPage = document.createElement('li');
      previousPage.classList.add('page-item', 'disabled');
      let previousLink = document.createElement('a');
      previousLink.classList.add('page-link');
      previousLink.innerHTML = 'Previous';
      previousLink.href = '#';
      previousLink.tabIndex = -1;
      previousPage.appendChild(previousLink);
      pagination.appendChild(previousPage);
  
      // create numbered pages
      for (let i = 0; i < totalPages; i++) {
        let page = document.createElement('li');
        page.classList.add('page-item');
        let pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.innerHTML = (i + 1).toString();
        pageLink.href = '#';
        pageLink.addEventListener('click', (event) => {
          currentPage = i + 1;
          this.showPage(event, currentPage, pageLimit);
          this.updateActivePage(currentPage);
        });
        page.appendChild(pageLink);
        pagination.appendChild(page);
      }
  
      // create next button
      let nextPage = document.createElement('li');
      nextPage.classList.add('page-item');
      if (totalPages <= 1) {
        nextPage.classList.add('disabled');
      }
      let nextLink = document.createElement('a');
      nextLink.classList.add('page-link');
      nextLink.innerHTML = 'Next';
      nextLink.href = '#';
      nextPage.appendChild(nextLink);
      pagination.appendChild(nextPage);
  
      // set first page as active
      this.updateActivePage(currentPage);
    }
  }

  // function to update active page
   updateActivePage(currentPage: number) {
    let pagination = document.getElementById('pagination');
    if (pagination) {
      let pages = pagination.getElementsByTagName('li');
      for (let i = 1; i < pages.length - 1; i++) {
        pages[i].classList.remove('active');
        if (i === currentPage) {
          pages[i].classList.add('active');
        }
      }
    }
  }
  
  showPage(event: MouseEvent, currentPage: number, pageLimit: number) {
    console.log('showPage');
    event.preventDefault();
    const currentTarget = (event as any).currentTarget;
    if (!currentTarget) return;
    let pageNumber = $(currentTarget).html() as string;
    this.selectedPage = parseInt(pageNumber);
    this.collection = new RecipeCollection(this.recipesToShow.slice((this.selectedPage - 1) * pageLimit, this.selectedPage * pageLimit));
    this.render();
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
    // this.$el.on('click', '#buttonSearchRecipe', this.searchRecipe.bind(this));
    return this;
  }

  truncate(inputString: string, maxLength: number) {
    return (inputString.length > maxLength) ? inputString.slice(0, maxLength - 1) + '…' : inputString;
  }
}

$(document).ready(function () {
  const router = new AppRouter();
  let home = new HomePageView({router: router});
  home.delegateEvents();
  Backbone.history.start({ pushState: true });
});
