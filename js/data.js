const newsCategoryApi = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data, defult);
        newCategory(data.data.news_category);
    } catch (error) {
        console.log("Unable to Connect", error)
    }
}

const newCategory = (categories) => {
    
    const menu = document.getElementById("menu");
    categories.forEach(category => {
        const li =document.createElement("li");
        li.classList.add('nav-item');
        li.innerHTML = `
         <a class="nav-link" href = "#" onclick = "newsLink('${category.category_id}', '${category.category_name}')" > ${category.category_name ? category.category_name : "Data Not Found" }</a>
        `
        menu.appendChild(li);
    })
    toggleSpinner(true);
}

const newsLink = async (category_id, category_name) => {
    toggleSpinner(true);
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        newsDetails(data.data, category_name);
    } catch (error) {
        console.log(`Unable to fetch newsLink Data ${error}`)
    }
    
}

const newsDetails = (details, name) => {
    const warning = document.getElementById("warning");
    if (details.length === 0) {
        warning.classList.remove("d-none")
    } else {
        warning.classList.add("d-none")
    }
    details.sort((a, b) => b.total_view - a.total_view);
    // console.log(details);
    // const highView = document.getElementById("high").addEventListener("click", function () {
    //     details.sort((a, b) => b.total_view - a.total_view);
    // })
    // console.log(highView)
    const items = document.getElementById("category-lenght");
    items.innerText = details.length;
    // console.log(name);
    const categoryName = document.getElementById("category");
    categoryName.innerText = name;
    const mainContainer = document.getElementById("display-news");
    mainContainer.textContent = '';
    details.map(newsData => {
        const div = document.createElement("div");
        div.classList.add("col", "my-4");
        div.innerHTML = `
        <div class="card">
                        <img src="${newsData.image_url}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${newsData.title ? newsData.title : "Not Found"}</h5>
                            <p class="card-text">${newsData.details ? newsData.details.slice(0, 400) : "Not Found"}...</p>
                        </div>
                        <div class="d-flex justify-content-between flex-column flex-md-column flex-sm-column">
                        <div class="flex flex-column flex-md-rows flex-sm-column">
                            <div class="px-3">
                                <img src="${newsData.author ? newsData.author.img : "Not Found"}" class="img-fluid rounded-circle" alt="" style = "width: 50px">
                            </div>
                            <div>
                                <span class="">${newsData.author.name ? newsData.author.name : "Not Found"}</span>
                                <p>${newsData.author.published_date ? newsData.author.published_date : "Not Found"}</p>
                            </div>
                        </div>
                        <div class = "d-flex">
                        <div class = "px-2">
                            <i class="fa-regular fa-eye"></i>
                            <span>${newsData.total_view ? newsData.total_view : "Not Found"}</span>
                        </div>
                        <div>
                            <span>${newsData.rating.number ? newsData.rating.number : "Not Found"}</span>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        </div>
                        <div style= "width: 50px;" class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="news('${newsData._id}')">
                            <a href="#"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
    `;
        mainContainer.appendChild(div)
    })
    toggleSpinner(false)
}

const toggleSpinner = isLoader => {
    const load = document.getElementById("loader");
    if(isLoader){
        load.classList.remove("d-none")
    }
    else {
        load.classList.add("d-none")
    }
}

const news = async news_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        newsFetch(data.data);
    // console.log(data.data);
    } catch (error) {
        console.log(`unable to fetch news data ${error}`)
    }
}

    const newsFetch = e => {
    e.map(list => {
        const modal = document.getElementById("exampleModalLabel");
        modal.innerHTML = `
    <h2>${list.title ? list.title : "Not Found"}</h2>
    `;
        const modalBody = document.getElementById("modal-body-news");
        modalBody.innerHTML = `
        <img class= "img-fluid" src = "${list.image_url}"/>
        <h1>Author Name: ${list.author.name}</h1>
        <h3>Published Date: ${list.author.published_date}</h3>
        <p>${list.details ? list.details : "Not Found"}</p>
        <p>Rating: ${list.rating.number ? list.rating.number : "Not Found"}</p>
        <p>Rating Badge: ${list.rating.badge ? list.rating.badge : "Not Found"}</p>
        <span>Views: ${list.total_view ? list.total_view : "Not Found"}</span> <i class="fa-regular fa-eye"></i>
        `
    })
    
}


newsCategoryApi();
newsLink('08', "All News");
