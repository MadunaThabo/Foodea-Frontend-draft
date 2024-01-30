import Backbone from "backbone";

export class IngredientsPageView extends Backbone.View {
    constructor() {
        super();
        this.$el = $('body');
        this.initialize();
    }

    initialize() {
        console.log('Ingredients PageView initialized');
    }

    render() {
        console.log('Ingredients PageView rendered');
        return this;
    }
}