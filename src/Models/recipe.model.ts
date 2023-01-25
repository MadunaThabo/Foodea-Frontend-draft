import Backbone from "backbone";

export class RecipeModel extends Backbone.Model{
    defaults() {
        return {
            title: '',
            ingredients: [],
            instructions: '',
            image: ''
        }
    }
}
