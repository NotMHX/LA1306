// import ping from "./pingFunc.js";

document.getElementById("addBtn").onclick = () => {
  addSite();
};

// async function checkSite() {
//   let url = document.getElementById("websiteInput").value;
//   console.log(`Input: ${url}`);
//   let doesSiteExist = await ping(url);
//   console.log(doesSiteExist);
//   if (doesSiteExist) {
//     console.log("Site exists!");
//     // add to json
//   } else {
//     console.log("Site doesn't exist.");
//   }
// }

async function addSite() {

  const name = document.getElementById("nameInput").value;
  const url = document.getElementById("websiteInput").value;
  const newDiv = document.getElementById("resultBox");

  // addOne with mongodb
  await fetch("https://localhost:7082/api/Website/add"
    , {
      method: "POST",
      body: JSON.stringify({
        id: 0,
        title: name,
        weblink: url,
        dateAdded: "2023-06-07T08:02:00.844Z",

      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
  // message that it has been added
  const resultText = document.createElement("p");
  resultText.className = "sectionDesc";
  resultText.textContent = `The URL would be added to the database as following: Website title: ${name} Weblink: ${url} Cr`;
  newDiv.appendChild(resultText);
}



