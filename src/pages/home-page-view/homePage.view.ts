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
  ingredients: string[] = [];
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
    this.hideLoader();
  }

  async initialize() {
    //get recipes for the day
    this.showLoader();
    this.recipesToShow = this.recipesForTheDay = await this.getRandomRecipe(1);
    // this.hideLoader();
    this.collection =  new RecipeCollection(this.recipesForTheDay);
    this.render();
    this.updatePagination(this.recipesForTheDay);
    this.triggerFirstPage();
    this.updateActivePage(1);
    this.addEvents();
    this.hideLoader();
    this.hideIngredientBar();
  }

  triggerFirstPage(){
    //trigger showPage 1
    let page1 = document.getElementById('page1') as HTMLAnchorElement;
    if(page1){
      page1.click();
    }
  }

  addEvents(){
    //get random recipes
    let buttonRandomRecipe = document.getElementById('buttonRandomRecipe');
    if (buttonRandomRecipe) {
      buttonRandomRecipe.onclick = (event) => {
        this.openARandomRecipe(event);
      };
    }

    //search recipes
    let searchButton = document.getElementById('buttonSearchRecipe');
    if (searchButton) {
      searchButton.onclick = (event) => {
        this.showLoader();
        this.searchRecipe(event);
        // this.hideLoader();
      };
    }

    //get recipes by ingredients
    let buttonGetRecipeByIngredients = document.getElementById('getRecipesByIngredientButton');
    if(buttonGetRecipeByIngredients){
      buttonGetRecipeByIngredients.onclick = (event) => {
        this.getRecipesByIngredients(event);
      };
    }

    //Go to home page
    let homeButton = document.getElementById('buttonHomePage');
    if (homeButton) {
      homeButton.addEventListener('click', async () => {
        this.goToHomePage();
      });
    }

    //Go to home page
    let websiteNameElement = document.getElementById('websiteName');
    if (websiteNameElement) {
      websiteNameElement.addEventListener('click', async () => {
        this.goToHomePage();
      });
    }
    
    let buttonBackToRecipes = document.getElementById('buttonBackToRecipes');
    if (buttonBackToRecipes) {
      buttonBackToRecipes.addEventListener('click', async () => {
        this.goToHomePage();
      });
    }

    //Add ingredient
    let addIngredientBtn = document.getElementById('buttonAddIngredient');
    let ingredientSearchBar = document.getElementById('ingredientSearchBar') as HTMLInputElement;
    if(addIngredientBtn && ingredientSearchBar){
      addIngredientBtn.onclick = (event)=> {
        let ingredient = ingredientSearchBar.value.trim();
        if (ingredient !== '') {
          this.ingredients.push(ingredient);
          this.displayIngredients();
          ingredientSearchBar.value = '';
        }
      };
    }

    //Clear ingredients
    let clearIngredientsBtn = document.getElementById('buttonClearIngredients');
    if(clearIngredientsBtn){
      clearIngredientsBtn.onclick = (event)=> {
        this.ingredients = [];
        this.displayIngredients();
      };
    }

    //On fridge click
    let buttonShowIngredientSearch = document.getElementById('buttonShowIngredientSearch');
    if(buttonShowIngredientSearch){
      buttonShowIngredientSearch.onclick = (event)=> {
        this.showIngredientBar();
      };
    }

    //change page
    this.$el.on('click', '.page-link', (event) => {
      event.preventDefault();
      const page = $(event.currentTarget).data('page');
      if (page) {
        this.selectedPage = page;
        this.updateActivePage(page);
        this.render();
      }
    });
  }

  displayIngredients() {
    let selectedIngredients = document.getElementById('selectedIngredients');
    if (!selectedIngredients) return;
    selectedIngredients.innerHTML = '';
    for (const ingredient of this.ingredients) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = ingredient;
      const removeIngredientBtn = document.createElement('button');
      removeIngredientBtn.className = 'btn btn-danger btn-sm float-right remove-ingredient-btn';
      removeIngredientBtn.textContent = 'X';
      removeIngredientBtn.onclick = (event) => {
        event.preventDefault();
        this.ingredients = this.ingredients.filter((ing) => ing !== ingredient);
        this.displayIngredients();
      };
      li.appendChild(removeIngredientBtn);
      selectedIngredients.appendChild(li);
    }
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
      'click #buttonRandomRecipe .button': 'openARandomRecipe',
      'click .card': 'openRecipeView',
      'click #buttonHomePage': 'goToHomePage',
      'click #buttonSearchRecipe': 'searchRecipe',
    };
  }


  async searchRecipe(event: MouseEvent) {
    //TODO: fix paginattion for search
    event.preventDefault();
    console.log('searchRecipe');
    this.showLoader();
    let searchInput = document.getElementById('searchInput') as HTMLInputElement;
    console.log('searchInput', searchInput);
    if (searchInput) {
      if(searchInput.value == ''){
        console.log('searchInput.value', searchInput.value);
        this.recipesToShow = this.recipesForTheDay;
        this.collection = new RecipeCollection(this.recipesForTheDay);
        this.render();
        this.updatePagination(this.recipesForTheDay);
        this.updateActivePage(1);
        this.triggerFirstPage();
        this.hideLoader();
      }
      else{
        this.searchString = searchInput.value;
        if(this.recipeService == null) return;
        this.recipesToShow = this.searchedRecipes = await this.recipeService.searchRecipe(this.searchString);
        this.showLoader();
        console.log('searchedRecipes', this.searchedRecipes);
        this.collection = new RecipeCollection(this.searchedRecipes);
        this.render();
        this.updatePagination(this.searchedRecipes);
        this.updateActivePage(1);
        this.triggerFirstPage();
        // this.hideLoader();
      }
    }
    
  }

  showLoader() {
    console.log('showLoader');
    let loader = document.getElementById('loaderContainer');
    if (loader) {
      loader.hidden = false;
    }
  }

  hideLoader() {
    console.log('hideLoader');
    let loader = document.getElementById('loaderContainer');
    if (loader) {
      loader.hidden = true;
    }
  }

  showIngredientBar() {
    let ingredientSearchContainer = document.getElementById('ingredientSearchContainer');
    if (ingredientSearchContainer) {
      ingredientSearchContainer.hidden = false;
    }
  }

  hideIngredientBar() {
    let ingredientSearchContainer = document.getElementById('ingredientSearchContainer');
    if (ingredientSearchContainer) {
      ingredientSearchContainer.hidden = true;
    }
  }

  async getRecipesByIngredients(event: MouseEvent) {
    let ingredients = '';
    this.showLoader();
    event.preventDefault();
    for (const ingredient of this.ingredients) {
      ingredients += ingredient + ',';
    }
    if(this.recipeService == null) return;
    this.searchedRecipes = await this.recipeService.searchRecipeByIngredients(ingredients);
    console.log('searchedRecipes', this.searchRecipe);
    this.collection = new RecipeCollection(this.searchedRecipes);
    this.updatePagination(this.searchedRecipes);
    this.render();
    this.goToHomePage(event);
    this.updateActivePage(1);
    this.triggerFirstPage();
    
  }

  async openARandomRecipe(event: MouseEvent) {
    event.preventDefault();
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
    this.showLoader();
    this.hideIngredientBar();
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

  updatePagination(collection: IRecipe[]) {
    let pagination = document.getElementById('pagination');
    if (pagination) {
      pagination.innerHTML = ''; // clear the pagination first
      
      let pageLimit = 12;
      let totalPages = Math.ceil(collection.length / pageLimit);
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
        pageLink.id = 'page' + (i + 1).toString();
        pageLink.innerHTML = (i + 1).toString();
        pageLink.href = '#';
        pageLink.addEventListener('click', (event) => {
          currentPage = i + 1;
          this.showPage(event, currentPage, pageLimit,collection);
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
          break;
        }
      }
    }
  }
  
  showPage(event: MouseEvent, currentPage: number, pageLimit: number, collection: IRecipe[], list: IRecipe[]| null = null) {
    console.log('showPage');
    event.preventDefault();
    const currentTarget = (event as any).currentTarget;
    if (!currentTarget) return;
    let pageNumber = $(currentTarget).html() as string;
    this.selectedPage = parseInt(pageNumber);
    this.collection = new RecipeCollection(this.recipesToShow.slice((this.selectedPage - 1) * pageLimit, this.selectedPage * pageLimit));
    // this.updatePagination(collection);
    this.render();   
    this.updatePagination(collection);
    this.updateActivePage(1);
  }
  
  

  render() {
    let recipeTemplate = _.template($('#recipe-card-template').html());
    let recipeHTML = recipeTemplate({ recipes: this.collection.toJSON() });
    let recipeContainer = document.getElementById('recipe-cards');
    if (recipeContainer) recipeContainer.innerHTML = recipeHTML;
    this.delegateEvents();
    // this.$el.on('click', '.card img', this.openRecipeView.bind(this));
    this.hideLoader();
    return this;
  }

  truncate(inputString: string, maxLength: number) {
    return (inputString.length > maxLength) ? inputString.slice(0, maxLength - 1) + '…' : inputString;
  }
}
