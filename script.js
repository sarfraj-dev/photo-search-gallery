const accessKey="_Fuln0bmsQCcUcUJHacikqX8akmeFAzK_Wyh_v2uEk0";
const formElement=document.querySelector("form");
const inputElement=document.getElementById("searchInput");
const searchResults=document.querySelector(".searchResults");
const showMore=document.getElementById("showMoreButton");

let inputData ="";
let page = 1;

async function searchImages() {
    inputData=inputElement.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response =await fetch(url);
    const data =await response.json();
    const results = data.results;

    if(page===1){
        searchResults.innerHTML=""
    }

    results.map((result)=>{
        const imageWrapper=document.createElement("div");
        imageWrapper.classList.add("searchResultContent");
        const image=document.createElement("img");
        image.src=result.urls.small
        image.alt=result.alt_description
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html
        // console.log(imageLink.href=result.links.html)
        imageLink.target ="_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        // console.log(imageWrapper.appendChild(imageLink));
        searchResults.appendChild(imageWrapper)
    })
    page++
    if(page > 1){
        showMore.style.display="block";
    }
}
formElement.addEventListener("submit",(event)=>{
    event.preventDefault()
    page =1;
    searchImages()
})
showMore.addEventListener("click",()=>{
    searchImages()
})