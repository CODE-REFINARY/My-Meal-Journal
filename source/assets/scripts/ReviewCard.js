// ReviewCard.js

class ReviewCard extends HTMLElement {
  // Called once when document.createElement('review-card') is called, or
  // the element is written into the DOM directly as <review-card>
  constructor() {
    super(); 


    let shadowEl = this.attachShadow({mode:'open'});

    let articleEl = document.createElement('article');

    let styleEl = document.createElement('style');
    styleEl.textContent = `
      * {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
      }
    
      a {
        text-decoration: none;
      }
    
      a:hover {
        text-decoration: underline;
      }
    
      article {
        align-items: center;
        border: 1px solid rgb(223, 225, 229);
        border-radius: 8px;
        display: grid;
        grid-template-rows: 118px 56px 14px 18px 15px 36px;
        height: auto;
        row-gap: 5px;
        padding: 0 16px 16px 16px;
        width: 178px;
      }
    
      div.rating {
        align-items: center;
        column-gap: 5px;
        display: flex;
      }
    
      div.rating>img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }
    
      article>img {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 118px;
        object-fit: cover;
        margin-left: -16px;
        width: calc(100% + 32px);
      }
    
      label.restaurant-name {
        color: black !important;
      }
    
      label.meal-name {
        display: -webkit-box;
        font-size: 16px;
        height: 36px;
        line-height: 18px;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    
      label:not(.meal-name),
      span,
      time {
        color: #70757A;
        font-size: 12px;
      }
    `;
    articleEl.append(styleEl);
    shadowEl.append(articleEl);
    this.shadowEl = shadowEl;
    //attach event listener to each recipe-card
    this.addEventListener('click', (event) => {
      console.log(event.target);
      console.log(event.target.data);
      //Option 1: sending current data to second html page using localStorage (could also just store index)
      sessionStorage.setItem('current', JSON.stringify(event.target.data));
      window.location.assign("./ReviewDetails.html");
      /*
      //Option 2: sending current data to second html page using string query w/ url (currently not storing value)
      let reviewFields = window.location.search.slice(1).split("&");
      for(let i = 0; i < reviewFields.length; i++) {
        let kv = reviewFields[i].split("=");
        let key = kv[0]; 
        let value = kv[1];
        console.log(key);
        console.log(value);
        // What you want to do with name and value...
      }*/
    });
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For Example:
   * let reviewCard = document.createElement('review-card'); 
   * reviewCard.data = { foo: 'bar' } 
   *
   * @param {Object} data - The data to pass into the <review-card>, must be of the
   *                        following format:
   *                        {
   *                          "comments": "string",
   *                          "imgAlt": "string",
   *                          "mealImg": "string",
   *                          "mealName": "string",
   *                          "restaurant": "string",
   *                          "rating": number,
   *                          "tags": string array
   *                        }
   */
  set data(data) {
    // If nothing was passed in, return
    if (!data) return;

    // Select the <article> we added to the Shadow DOM in the constructor
    let articleEl = this.shadowEl.querySelector('article');
    
    // setting the article elements for the review card

    //image setup
    let mealImg = document.createElement('img');
    mealImg.setAttribute('id', 'a-mealImg');
    mealImg.setAttribute('src',data['mealImg']);
    mealImg.setAttribute('alt',data['imgAlt']);

    //meal name setup
    let mealLabel = document.createElement('label');
    mealLabel.setAttribute('id', 'a-mealName');
    mealLabel.setAttribute('class','meal-name');
    mealLabel.innerHTML = data['mealName'];

    //restaurant name setup
    let restaurantLabel = document.createElement('label');
    restaurantLabel.setAttribute('id', 'a-restaurant');
    restaurantLabel.setAttribute('class','restaurant-name');
    restaurantLabel.innerHTML = data['restaurant'];

    //comment section setup (display set to none)
    let comments = document.createElement('p');
    comments.setAttribute('id', 'a-comments');
    comments.style.display = 'none';
    comments.innerText = data['comments'];

    //other info: rating
    let ratingDiv = document.createElement('div');
    ratingDiv.setAttribute('class', 'rating');
    let starsImg = document.createElement('img');
    starsImg.setAttribute('id', 'a-rating');
    starsImg.setAttribute('src', './source/assets/images/icons/'+data['rating']+'-star.svg');
    starsImg.setAttribute('alt', data['rating'] +' stars');
    starsImg.setAttribute('num', data['rating']);
    ratingDiv.append(starsImg);

    //added tags
    let tagContainer = document.createElement('div');
    tagContainer.setAttribute('class', 'tag-container');
    tagContainer.setAttribute('id', 'a-tags');
    tagContainer.setAttribute('list', data['tags']);
    if(data['tags']){
      for (let i = 0; i < data['tags'].length; i++) {
        let newTag = document.createElement('label');
        newTag.setAttribute('class','tag');
        newTag.innerHTML = data['tags'][i] + "   ";
        tagContainer.append(newTag);
      }
    }

    articleEl.append(mealImg);
    articleEl.append(mealLabel);
    articleEl.append(restaurantLabel);
    articleEl.append(ratingDiv);
    articleEl.append(tagContainer);
    articleEl.append(comments);


  }

    /**
   * Called when getting the .data property of this element.
   *
   * For Example:
   * let reviewCard = document.createElement('review-card'); 
   * reviewCard.data = { foo: 'bar' } 
   *
   * @return {Object} data - The data from the <review-card>, of the
   *                        following format:
   *                        {
   *                          "comments": "string",
   *                          "imgAlt": "string",
   *                          "mealImg": "string",
   *                          "mealName": "string",
   *                          "restaurant": "string",
   *                          "rating": number,
   *                          "tags": string array
   *                        }
   */
  get data() {

    let dataContainer = {};
    
    // getting the article elements for the review card

    //get image
    let mealImg = this.shadowEl.getElementById('a-mealImg');
    dataContainer['mealImg'] = mealImg.getAttribute('src');
    dataContainer['imgAlt'] = mealImg.getAttribute('alt');

    //get meal name
    let mealLabel = this.shadowEl.getElementById('a-mealName');
    dataContainer['mealName'] = mealLabel.innerHTML;

    //get comment section
    let comments = this.shadowEl.getElementById('a-comments');
    console.log(comments);
    dataContainer['comments'] = comments.innerText;

    //get other info: rating
    let starsImg = this.shadowEl.getElementById('a-rating');
    dataContainer['rating'] = starsImg.getAttribute('num');

    //get restaurant name
    let restaurantLabel = this.shadowEl.getElementById('a-restaurant');
    dataContainer['restaurant'] = restaurantLabel.innerHTML;

    //get tags
    let tagContainer = this.shadowEl.getElementById('a-tags');
    dataContainer['tags'] = tagContainer.getAttribute('list').split(",");

    return dataContainer;
  }
}
customElements.define('review-card', ReviewCard);
