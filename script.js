const recipeContainer = document.querySelector('.recipe-container')
const serach = document.querySelector('.serach')
const btn = document.querySelector('.btn')
const tag = document.querySelector('.tag')
const recipeDetails = document.querySelector('.recipe-details')
const closeBtn = document.querySelector('.closeBtn')
const content = document.querySelector('.content')
const loader = document.querySelector('.loader')



const fetchRecipe = async (query) => {
    try {
        loader.style.display = 'block'
        recipeContainer.innerHTML = '<h1 class="text-4xl mt-32 text-center">Fetching recipies....<h1>'
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const response = await data.json()
        console.log(response.meals[0]);

        recipeContainer.innerHTML = ''
        loader.style.display = 'none'
        if (!response.meals) {
            throw new Error('Error fetching recipes or recipe does not exist');
        }
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div')
            recipeDiv.innerHTML = `
            <div class='mt-4 ml-2 bg-gray-100 relative h-[40vw]'>
                <img src=${meal.strMealThumb} height='300' class='md:h-[200px] object-cover md:w-full'>
                <h3 class='px-4 text-4xl bg-green-200 font-bold py-3'>${meal.strMeal}</h3>
                <p class='mx-4 text-2xl font-bold py-3 '>${meal.strArea}</p>
                <p class='mx-4 text-xl font-bold py-3'>${meal.strCategory}</p>
            </div>
        `
            const button = document.createElement('button')
            button.textContent = 'View Recipie'
            button.classList.add('btn2')
            recipeDiv.appendChild(button)
            button.addEventListener('click', () => {
                openRecipe(meal)
            })
            recipeContainer.appendChild(recipeDiv)
        })
    } catch (error) {
        recipeContainer.innerHTML = `<h1 class='fixed top-[50%] left-[50%] -translate-x-[50%] rounded-lg -translate-y-[50%] r text-6xl text-red-700 font-bold'>${'Error fetching recipes or recipe does not exist'}</h1>`;
        loader.style.display = 'none'
    }
}

const fetchIngredients = (meal) => {
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measurement = meal[`strMeasure${i}`]
            ingredientsList += `<li class='mt-2 text-center uppercase text-lg'>${measurement} ${ingredient}</li> `
        }
        else {
            break
        }
    }
    return ingredientsList
}

let openRecipe = (meal) => {
    content.innerHTML = `
        <h2 class='font-bold text-3xl text-center'>${meal.strMeal}</h2>
        <h2 class='font-bold text-xl py-3 px-5 text-center'>Ingredients:</h2>
        <ul>${fetchIngredients(meal)}</ul>
        <h2 class='font-bold text-xl py-3 px-5 text-center'>Instructions:</h2>
        <p class=' text-xl py-3 px-5 text-center'>${meal.strInstructions}</p>
        
    `
    content.parentElement.style.display = "block"
}

closeBtn.addEventListener('click', () => {
    content.parentElement.style.display = "none"
})
btn.addEventListener('click', (e) => {
    e.preventDefault()
    tag.style.display = 'none'
    const serachInput = serach.value.trim()
    fetchRecipe(serachInput)

})