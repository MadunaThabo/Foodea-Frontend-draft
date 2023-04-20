console.warn('Application is starting...');
import { Router } from 'backbone';
import { HomePageView } from './pages/home-page-view/homePage.view';
import Backbone from 'backbone';
import { HomePageController } from './pages/home-page-view/home-page.controller';

const router = new Router({
  routes: {
    'home': 'loadHomePage',
    '*path': 'defaultRoute'
  },
  // set root for the router
  root: '/'
});

router.on('route:loadHomePage', () => {
  const homePageView = new HomePageView();
  homePageView.render();
});

const homePageController = new HomePageController();
router.on('route:loadHomePage', homePageController.loadHomePage.bind(homePageController));


// Start Backbone history a necessary step for bookmarkable URL's
Backbone.history.start({ pushState: true }); // enable pushState to remove '#' from URL