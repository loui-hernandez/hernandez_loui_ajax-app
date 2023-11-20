(() => {

  const peopleCon = document.querySelector("#people-con");

  let spinner = ``;

  function getData() {
    peopleCon.innerHTML = spinner;
    fetch("https://randomuser.me/api/?results=20")
    .then(response => response.json())
    .then(people => {
      console.log(people);

      let ul = document.createElement("ul");
      
      people.results.forEach(result => {
       
        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = result.picture.thumbnail;

        const h3 = document.createElement("h3");
        h3.textContent = `${result.name.first} ${result.name.last}`;

        const p = document.createElement("p");
        p.textContent = result.email;

        li.appendChild(img);
        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);

    });

    peopleCon.innerHTML="";
     peopleCon.appendChild(ul);   

    })
    .catch(error => console.error(error)); //catch and report any errors
  }

  getData();

})();