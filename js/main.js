(() => {
  // variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
  const materialInfo = document.querySelectorAll(".material-info");
  let spinner = `<svg width="512" height="512" viewBox="0 0 512 512" style="color:#E4AB00" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <path fill="none" stroke="#000000" stroke-width="8" stroke-dasharray="179.61224975585938 76.97667846679687" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.6);transform-origin:50px 50px">
      <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.25s" keyTimes="0;1" values="0;256.58892822265625"></animate>
    </path>
  </svg>`;

  // functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
      .then(response => response.json())
      .then(infoBoxes => {
        infoBoxes.forEach((infoBox, index) => {
          let selected = document.querySelector(`#hotspot-${index + 1}`);
          const titleElement = document.createElement('h2');
          titleElement.textContent = infoBox.heading;
          const textElement = document.createElement('p');
          textElement.textContent = infoBox.description;
          const imageElement = document.createElement('img');
          imageElement.src = `images/${infoBox.thumbnail}`;
          selected.appendChild(imageElement);
          selected.appendChild(titleElement);
          selected.appendChild(textElement);
        });
      })
      .catch(error => console.error(error));
  }

  function loadMaterialInfo() {
    materialInfo.forEach(info => (info.innerHTML = spinner));
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(materials => {
        materials.forEach(material => {
          const clone = materialTemplate.content.cloneNode(true);
          const materialHeading = clone.querySelector('.material-heading');
          materialHeading.textContent = material.heading;
          const materialDescription = clone.querySelector('.material-description');
          materialDescription.textContent = material.description;
          materialList.appendChild(clone);
        });
        materialInfo.forEach(info => {
          info.innerHTML = "";
          info.appendChild(materialList);
        });
      })
      .catch(error => console.error(error));
  }

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  // Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

  // Load data
  loadInfoBoxes();
  loadMaterialInfo();
})();
