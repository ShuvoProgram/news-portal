const newsCategoryApi = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data, defult);
    newCategory(data.data.news_category);
}

const newCategory = (categories) => {
    const menu = document.getElementById("menu");
    const warning = document.getElementById("warning");
    if (categories.length === 0) {
        warning.classList.remove("hidden")
    } else {
        warning.classList.add("hidden")
    }
    categories.forEach(category => {
        const li =document.createElement("li");
        li.classList.add('p-4');
        li.innerHTML = `
        <a href="#" onclick= "newsLink('${category.category_id}')">${category.category_name ? category.category_name : "Data Not Found"}</a>`;
        menu.appendChild(li);
    })
    toggleSpinner(true);
}

const newsLink = async category_id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    newsDetails(data.data);
}

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
                    <p class="text-xl font-medium py-2">${newsData.title ? newsData.title : "Not Found"}</p>
                    <p class="py-2">${newsData.details ? newsData.details.slice(0, 400) : "Not Found"}...</p>
                    <div class="flex justify-between">
                        <div class="flex">
                            <div class="px-3">
                                <img src="${newsData.author ? newsData.author.img : "Not Found"}" class="w-12 rounded-2xl" alt="">
                            </div>
                            <div>
                                <span>${newsData.author.name ? newsData.author.name : "Not Found"}</span>
                                <p>${newsData.author.published_date ? newsData.author.published_date : "Not Found"}</p>
                            </div>
                        </div>
                        <div>
                            <i class="fa-regular fa-eye"></i>
                            <span>${newsData.total_view ? newsData.total_view : "Not Found"}</span>
                        </div>
                        <div>
                            <span>${newsData.rating.number ? newsData.rating.number : "Not Found"}</span>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="px-6 py-2.5  bg-blue-600  text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:bg-blue-700 hover:shadow-lg  focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0  active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="news('${newsData._id}')">
                            <a href="#"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
    `;
        mainContainer.appendChild(div)
    })
    toggleSpinner(false)
}

const newsFetch = e => {
    console.log(e)
    e.map(list => {
        const modal = document.getElementById("modalTitle");
        modal.innerHTML = `
    <h2>${list.title ? list.title : "Not Found"}</h2>
    `;
        const modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = `
        <img src = "${list.image_url}"/>
        <h1>Author Name: ${list.author.name}</h1>
        <h3>Published Date: ${list.author.published_date}</h3>
        <p>${list.details ? list.details : "Not Found"}</p>
        <p>Rating: ${list.rating.number ? list.rating.number : "Not Found"}</p>
        <p>Rating Badge: ${list.rating.badge ? list.rating.badge : "Not Found"}</p>
        <span>Views: ${list.total_view ? list.total_view : "Not Found"}</span> <i class="fa-regular fa-eye"></i>
        `
    })
    
}

const news = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    newsFetch(data.data);
    // console.log(data.data);
}



const toggleSpinner = isLoader => {
    const load = document.getElementById("loader");
    if(isLoader){
        load.classList.remove("hidden")
    }
    else {
        load.classList.add("hidden")
    }
}
const toggleSpinner2 = isLoader => {
    const loader = document.getElementById("loader");
    if (isLoader) {
        loader.classList.remove("hidden")
    } else {
        loader.classList.add("hidden")
    }
}
newsCategoryApi("01");
// news();
// newsApi();
// newsLink();