const newsCategoryApi = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    newCategory(data.data.news_category);
}

const newCategory = (categories) => {
    const menu = document.getElementById("menu");
    categories.forEach(category => {
        const li =document.createElement("li");
        li.classList.add('p-4');
        li.innerHTML = `
        <a href="#" onclick= "newsLink('${category.category_id}')">${category.category_name}</a>`;
        menu.appendChild(li);
    })
}

const newsLink = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    newsDetails(data.data);
}

// const news = async news_id => {
//     const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data.data);
// }

const newsDetails = details => {
    const mainContainer = document.getElementById("display-news");
    mainContainer.textContent = '';
    details.map(newsData => {
        const div = document.createElement("div");
        div.classList.add("flex", "box-border", "shadow-lg", "m-4");
        div.innerHTML = `
    <div class="h-10">
                    <img class="w-96" src="${newsData.image_url}" class="border-box" alt="">
                </div>
                <div class="p-4">
                    <p class="text-xl font-medium py-2">${newsData.title}</p>
                    <p class="py-2">${newsData.details.slice(0, 400)}...</p>
                    <div class="flex justify-between">
                        <div class="flex">
                            <div class="px-3">
                                <img src="${newsData.author.img}" class="w-12 rounded-2xl" alt="">
                            </div>
                            <div>
                                <span>${newsData.author.name}</span>
                                <p>${newsData.author.published_date}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-regular fa-eye"></i>
                            <span>${newsData.total_view}</span>
                        </div>
                        <div>
                            <span>${newsData.rating.number}</span>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="text-blue-700 font-bold">
                            <a href=""><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
    `;
        mainContainer.appendChild(div)
    })
    
}

newsCategoryApi();
// newsApi();
// newsLink();