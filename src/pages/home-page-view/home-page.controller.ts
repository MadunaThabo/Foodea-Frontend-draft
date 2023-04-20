import { HomePageView } from "./homePage.view";

export class HomePageController {
    private homePageView: HomePageView;
  
    constructor() {
      // create an instance of HomePageView
      this.homePageView = new HomePageView();
    }
  
    // method called when the route '/home' is accessed
    public loadHomePage(): void {
      this.homePageView.render();
    }
  }