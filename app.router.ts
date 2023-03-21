// //router to recipe view page
// import { Router } from 'backbone';
// import { HomePageView } from './app';
// import { RecipeModel } from './src/models/recipe.model';
// import { RecipeViewPage } from './src/pages/recipe-view-page/recipe-view-page';
// import { IRecipe, RecipeService } from './src/services/Recipe';

// export class AppRouter extends Router {
//   routes = {
//     '': 'HomePage',
//     'recipe/:id': 'ViewRecipePage'
//   }
//   recipeService: RecipeService;

//   constructor() {
//     super();
//     this.recipeService = new RecipeService();
//   }

//   HomePage() {
//     let home = new HomePageView();
//   }

//   async ViewRecipePage(id: number) {
//     console.log('recipeView:\n', 'id:', id);
//     let recipe = await this.recipeService.getRecipeById(id);
//     console.log('recipe', recipe);
//     //make the model
//     let recipeModel = new RecipeModel(recipe);
//     let recipeViewPage = new RecipeViewPage(recipeModel);
//     recipeViewPage.render();
//   }
// }
