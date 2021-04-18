class Recipe{
    constructor(name, servings, preptime, cooktime,difficulty, directions, ingredient_list) {
        this.name = name;
        this.servings = servings;
        this.preptime = preptime;
        this.cookingtime = cooktime;
        this.difficulty = difficulty;
        this.directions = directions;
        this.ingredient_list = ingredient_list;
        this.recipe_id = -1;
    }
}