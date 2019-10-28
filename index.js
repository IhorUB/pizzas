// Завдання

// Є звичайна піцерія, в якій випікають різні види піц. Кожна піца має купу інгредієнтів. Вам надається перелік піци із інгредієнтами (їх кількістю).
// На вході ми маємо перелік піц, які були випечені за останній час. Реалізуйте функцію getPizzaInfo.
// Ваша задача визначити 5 найпопулярніших піц і надати список інгредієнтів, які були потрачені на приготування даних піц у порядку зростання (в залежності від тих піц, які задаються на вході).
// Меню з переліком піц:


const menu = {
    cap: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        sausage: 2,
        mashroom: 3,
        cheez: 1,
    },
    onions: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        meat: 1,
        cheez: 1,
    },
    king_one: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        mayo: 1,
        mashroom: 3,
        tomato: 2,
        cheez: 3,
        dill: 2,
        parsley: 2,
    },
    gavay: {
        dough: 1,
        tomato_sauce: 1,
        onion: 2,
        ananas: 1,
        cheez: 2,
    },
    tonno: {
        dough: 1,
        tomato_sauce: 1,
        tuna: 2,
        kappers: 1,
        cheez: 1,
    },
    vegeterian: {
        dough: 1,
        tomato_sauce: 1,
        tomato: 2,
        kappers: 1,
        cucumber: 2,
        onion: 2,
        cheez: 1,
    },
};

// orders during the last hour
const amount = [
    { name: "cap", value: Math.floor(Math.random() * 15) },
    { name: "onions", value: Math.floor(Math.random() * 15) },
    { name: "king_one", value: Math.floor(Math.random() * 15) },
    { name: "gavay", value: Math.floor(Math.random() * 15) },
    { name: "tonno", value: Math.floor(Math.random() * 15) },
    { name: "vegeterian", value: Math.floor(Math.random() * 15) }
];

let getPizzaInfo = (amount, pizzaMenu) => {
    //  sort orders 
    const sortAmount = amount.sort(function(a, b) {
        return a.value - b.value ? 1 : -1;
    });
    // get 5 top Pizza from sortAmount 
    const topFivePizza = sortAmount.slice(0, 5);
    // get Pizza names from topFivePizza 
    const pizzaNames = topFivePizza.map((elem) => elem.name);

    console.log('5 most popular pizzas:', JSON.stringify(pizzaNames, null, 2));
    document.getElementById("top-pizzas").innerHTML = JSON.stringify(pizzaNames, null, 2);

    // create object with ingredients for top 5 pizzas
    const pizzaIngredients = {};
    for (const topPizza of topFivePizza) {
        const ingredients = pizzaMenu[topPizza.name];
        pizzaIngredients[topPizza.name] = {
            ingredients: ingredients,
            value: topPizza.value
        };
    }

    const calculatedPizzaIngredients = {};
    const allIngredients = {};
    // calculate all ingredients for each pizzas 
    for (const pizzaName in pizzaIngredients) {
        const ingredients = pizzaIngredients[pizzaName].ingredients;
        calculatedPizzaIngredients[pizzaName] = {
            ingredients: ingredients,
            value: pizzaIngredients[pizzaName].value
        };

        for (const ingredientName in ingredients) {
            calculatedPizzaIngredients[pizzaName].ingredients[ingredientName] =
                ingredients[ingredientName] * pizzaIngredients[pizzaName].value;
        }
        // calculate all ingredients for All pizzas
        for (const ingredientName in ingredients) {
            if (!allIngredients[ingredientName]) {
                allIngredients[ingredientName] = ingredients[ingredientName]
            } else {

                allIngredients[ingredientName] += ingredients[ingredientName]
            }
        }
    }
    console.log(
        "counted ingredients for each pizzas",
        JSON.stringify(calculatedPizzaIngredients, null, 2)
    );
    document.getElementById("each-ingredients").innerHTML = JSON.stringify(calculatedPizzaIngredients, null, 2);
    console.log("All ingredients", JSON.stringify(allIngredients, null, 2));
    document.getElementById("all-ingredients").innerHTML = JSON.stringify(allIngredients, null, 2);

}
getPizzaInfo(amount, menu)