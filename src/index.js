let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => data.forEach(toy => renderToy((toy))))

  function renderToy(toy) {
    
    // toys.forEach((toy) => {
      const div = document.createElement('div')
      const h2 = document.createElement("h2")
      const img = document.createElement("img")
      const p = document.createElement("p")
      const button = document.createElement("button")
    
      div.classList.add('card')
      button.classList.add('like-btn')
      img.classList.add('toy-avatar')
    

      

      h2.innerText = toy.name
      img.src = toy.image
      p.innerText = `${toy.likes} Likes`
      button.innerText = "Like"
      // button.dataset.id = toy.id

      button.addEventListener('click', evt => {
        let likeNum = parseInt(p.innerText) 
        likeNum++
        p.innerText = `${likeNum} Likes`

        // let toy = {
        //   likes
        // }
        const configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: likeNum
          })
        }

        // debugger
        
        fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
        
      })

      const toyCollection = document.querySelector("#toy-collection")
      div.append(h2, img, p, button)
      toyCollection.append(div)
    // })
  }

  const toyForm = document.querySelector('.add-toy-form')

  toyForm.addEventListener('submit', (evt) => {
    evt.preventDefault()


    let formData = {
      name: evt.target.name.value,
      image: evt.target.image.value,
      likes: 0
    }
    

    let configObj = {
      method:  'POST',
      headers: 
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    } 
  

  fetch("http://localhost:3000/toys", configObj)
  .then(resp => resp.json())
  .then(data => renderToy(data))
  // .catch(function(error) {renderToys(data)
  //   alert("Bad things! Ragnarők!");
  //   console.log(error.message);
  // }); 
  evt.target.reset()
  })
  
});

