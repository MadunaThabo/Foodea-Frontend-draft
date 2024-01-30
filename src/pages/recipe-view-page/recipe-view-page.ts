import { Model } from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import { RecipeModel } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class RecipeViewPage extends Model {
  printRecipe() {
    throw new Error('Method not implemented.');
  }
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
    this.addEvents();
  }

  addEvents(){
    let printPDF = document.getElementById('printReceipeInPDF');
      if(printPDF){
        printPDF.onclick = (event)=> {
          this.printRecipeInPDF(event);
        };
      }
  }
  render(){
    let recipeTemplate = _.template($('#recipe-details-template').html());
    let recipeHTML = recipeTemplate({recipe: this.recipe.toJSON()});
    let recipeDetailsContainer = document.getElementById('recipe-details');
    let recipeCardsContainer = document.getElementById('recipe-cards');
    if(recipeCardsContainer){
      recipeCardsContainer.hidden = true;
    }
    if(recipeDetailsContainer){
      recipeDetailsContainer.innerHTML = recipeHTML;
      recipeDetailsContainer.hidden = false;
    } 
    this.addEvents();
    this.hideLoader();
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

  printRecipeInPDF(event: Event){
    console.log('printRecipeInPDF', event);
    let button1 = document.getElementById('printReceipeInPDF');
    if(button1){
      button1.hidden = true;
    }
    let button2 = document.getElementById('buttonBackToRecipes');
    if(button2){
      button2.hidden = true;
    }
    
    if(document.querySelector("#recipe-details") != null){
      const imageElement = document.getElementById('recipeDeatailImage');
      const pdf = new jsPDF('p', 'pt', 'a4');
      if(imageElement != null){
        const imageHeight = imageElement.clientHeight;
        const containerHeight = document.querySelector("#recipe-details").clientHeight;
        const scale = imageHeight / containerHeight;
        const img = document.querySelector('.recipe-details-image'); // Replace with the selector for the image element
        html2canvas(document.querySelector("#recipe-details")).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imageRatio = canvas.width / canvas.height;
          const pdfImageWidth = pdfWidth;
          const pdfImageHeight = pdfWidth / imageRatio;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfImageWidth, pdfImageHeight);
          pdf.save('recipe.pdf');
        });
      }
      else{
        console.error('something went wrong', imageElement)
      }
    }
  }
}

