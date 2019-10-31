/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const entryPoint = document.querySelector(".cards");
const followersSelector = document.querySelector(".cards");


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/
axios.get("https://api.github.com/users/bryankadams")
  .then(response => {
    console.log(response.data);
    const data = response.data;
    entryPoint.append(card(data));
    console.log(response);
  })
  .catch(error => {
    console.log(error.message);
  })

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/
const followersArray = [];
axios.get("https://api.github.com/users/bryankadams/followers").then(response => {
  response.data.map(item => {
    followersArray.push(item.login)
  })
})


function passGits(array){
  array.map(item => {
    axios.get("https://api.github.com/users/" + item).then(response => {
      const newGit = card(response.data);
      entryPoint.append(newGit);
    })
  })
}
if(entryPoint.hasChildNodes){
  entryPoint.addEventListener("click", () => {
    setTimeout(passGits, 500, followersArray)
  });

  // setTimeout(passGits, 500, followersArray);
  
}



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function card(item) {
  const newCard = document.createElement("div"),
    newImage = document.createElement("img"),
    cardInfo = document.createElement("div"),
    nameHeader = document.createElement("h3"),
    userName = document.createElement("p"),
    profile = document.createElement("p"),
    location = document.createElement("p"),
    urlToGit = document.createElement("a"),
    followers = document.createElement("p"),
    following = document.createElement("p"),
    bio = document.createElement("p");

  // appending parts together
  newCard.appendChild(newImage);
  newCard.appendChild(cardInfo);
  cardInfo.appendChild(nameHeader);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(urlToGit);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  // adding class names
  newCard.classList.add("card");
  cardInfo.classList.add("card-info");
  nameHeader.classList.add("name");
  userName.classList.add("username");
  // content
  newImage.src = item.avatar_url;
  nameHeader.textContent = item.name;
  userName.textContent = item.login;
  location.textContent = 'Location: ' + item.location;
  urlToGit.textContent = 'Profile: ' + item.html_url;
  urlToGit.href = item.html_url;
  followers.textContent = 'Followers: ' + item.followers;
  following.textContent = 'Following: ' + item.following;
  bio.textContent = 'bio: ' + item.bio;


  return newCard;
}
// setTimeout(passGits, 500, followersArray);


/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
