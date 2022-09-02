const newsCategoryApi = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    newsCategory(data.data.news_category)
}

const newsCategory = async (categories) => {
    // console.log(item.data.news_category)
    const menu = document.getElementById("menu");
    categories.forEach(category => {
        const li =document.createElement("li");
        li.classList.add('p-4');
        li.innerHTML = `
        <a onclick="newsApi(${category.category_id})" href="">${category.category_name}</a>`;
        menu.appendChild(li);
    })
}

newsCategoryApi();

// const newsApi = async (category_id) => {
//     const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data)
//     newsCategoryApi(data);
// }
// newsApi();