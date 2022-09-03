const NewsCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
        fetch(url)
            .then(res => res.json())
            .then(data => viewCategory(data.data.news_category))
}

const viewCategory = (data) => {
    const parent = document.getElementById('category');
    data.map(data => {
        const button = document.createElement('button');
        button.innerText = data.category_name;
        parent.appendChild(button)
        button.classList.add('text-slate-100', 'border-2', 'border-slate-900', 'hover:bg-blue-500', 'bg-slate-900', 'focus:ring-cyan-300', 'font-medium', 'rounded-3xl', 'text-sm', 'font-bolder', 'px-5', 'py-2.5', 'text-center', 'mr-2', 'mb-2')
        button.onclick = function () { getCategory(data.category_id); };
    })
}

const getCategory = category_id => {
    document.getElementById('news').innerHTML = ''
    document.getElementById('loader').classList.remove('hidden');
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        fetch(url)
            .then(res => res.json())
            .then(data => viewNews(data))
}