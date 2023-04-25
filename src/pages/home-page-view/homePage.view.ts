import $ from 'jquery';
import _ from 'underscore';
import { Router, View } from 'backbone';
import { RecipeCollection } from '../../collection/recipe.collection';
import { IRecipe } from '../../interfaces/recipe.interface';
import { RecipeService } from '../../services/recipe.service';
import { RecipeViewPage } from '../recipe-view-page/recipe-view-page';

export class HomePageView extends View {
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
    console.log('Constructing Home Page')
    super(options);
    this.recipeService = new RecipeService();
    this.$el = $('#recipe-cards');
    this.initialize();
  }

  async initialize() {
    //get recipes for the day
    this.recipesToShow = this.recipesForTheDay = await this.getRandomRecipe(72);
    this.collection =  new RecipeCollection(this.recipesForTheDay);
    this.render();
  }

  async getRandomRecipe(n: number): Promise<IRecipe[]> {
    console.log('getRandomRecipe', n);
    if(this.recipeService != null){
      return await this.recipeService.getRandomRecipe(n);
    }
    else{
      console.error('recipeService is null');
      return [];
    }
  }

 
  events(): Backbone.EventsHash {
    return {
      'click .buttonRandomRecipe': 'openARandomRecipe',
      'click .card': 'openRecipeView',
      'click #buttonHomePage': 'goToHomePage',
      'click #buttonSearchRecipe': 'searchRecipe',
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

  async openARandomRecipe(event: Event) {
    console.log('openARandomRecipe', 1);
    const currentTarget = (event as any).currentTarget;
      if (!currentTarget) return;
    let recipes: IRecipe[] = []
    if(this.recipeService != null){
      recipes = await this.getRandomRecipe(1);
    }
    else{
      console.error('recipeService is null');
      this.recipeService = new RecipeService();
      recipes = await this.getRandomRecipe(1);
    }
    this.openRecipeView(null,recipes[0]);
    console.log('recipes', recipes);
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
  
  

  render() {
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({ recipes: this.collection.toJSON() });
    let recipeContainer = document.getElementById('recipe-cards');
    if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
    this.delegateEvents();
    // this.$el.on('click', '.card img', this.openRecipeView.bind(this));
    this.updatePagination();
    return this;
  }

  truncate(inputString: string, maxLength: number) {
    return (inputString.length > maxLength) ? inputString.slice(0, maxLength - 1) + '…' : inputString;
  }
}
