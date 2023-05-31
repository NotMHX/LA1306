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

function addSite() {
  const name = document.getElementById("nameInput").value;
  const url = document.getElementById("websiteInput").value;
  const date = formatDate();

  const newDiv = document.getElementById("resultBox");

  // addOne with mongodb

  // message that it has been added
  const resultText = document.createElement("p");
  resultText.className = "sectionDesc";
  resultText.textContent = `The URL would be added to the database as following: Website title: ${name} Weblink: ${url} Created: ${date}`;
  newDiv.appendChild(resultText);
}

function formatDate() {
  let date = new Date();
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + "/" + month + "/" + year;
}
