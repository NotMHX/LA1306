document.getElementById("searchInput").addEventListener("input", async (e) => {
  // Clear the div in order to load the new results
  document.getElementById("list").innerHTML = "";

  let value = e.target.value;
  const webList = await fetchSites("search");

  if (value != "") {
    setList(
      webList.filter((website) => {
        return website.title.toLowerCase().includes(value);
      })
    );
  } else {
    return null;
  }
});

async function fetchSites(page) {
  const response = await fetch("../websites.json");
  // replace this with the database
  const json = await response.json();
  switch (page) {
    case "all":
      listSites(json);
      break;
    case "index":
      listLatest(json);
      break;
    case "search":
      return json;
    default:
      console.log("Not a valid page.");
      break;
  }
}

function setList(webList) {
  for (const website of webList) {
    // creating a li element for each result item
    const resultItem = document.createElement("li");

    // adding a class to each item of the results
    resultItem.className = "resultItem";

    // grabbing the name of the current point of the loop and adding the name as the list item's text
    const link = document.createElement("a");
    link.href = website.weblink;
    link.innerHTML = website.title;
    link.target = "_blank";

    // appending the text to the result item
    resultItem.append(link);

    // appending the result item to the list
    document.getElementById("list").append(resultItem);
  }
}

function listSites(webList) {
  const websiteContainer = document.getElementById("websiteList");

  for (let e in webList) {
    // section box
    let list = document.createElement("ul");
    list.className = "sectionBox";
    list.id = `website${e}`;
    console.log(`Created box`);
    websiteContainer.append(list);

    // website name
    let websiteName = document.createElement("li");
    websiteName.innerHTML = `${webList[e].title}`;
    websiteName.style = "font-weight: bold;";
    console.log(`Created title ${webList[e].title}`);
    list.append(websiteName);

    // created date
    let websiteAdded = document.createElement("li");
    websiteAdded.innerHTML = `<img src=./img/calendar.png alt="Date Added">${webList[e].created}`;
    console.log(`Created date ${webList[e].created}`);
    list.append(websiteAdded);

    let linkText = splitLink(webList[e].weblink);
    // splits link to make a name (eg. https://www.test.com/main -> test.com/main)

    // link
    let websiteLink = document.createElement("li");
    websiteLink.innerHTML = `<img src=./img/link.png alt="Link"><a href="${webList[e].weblink}" target="_blank">${linkText}</a>`;
    console.log(`Created link ${webList[e].weblink}`);
    list.append(websiteLink);

    // delete button
    let websiteDelete = document.createElement("li");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.addEventListener("click", () => deleteSite(webList[e]));
    websiteDelete.append(deleteBtn);
    list.append(websiteDelete);
  }

  // if there's no entries
  if (websiteContainer.innerHTML == "") {
    let errorText = document.createElement("h1");
    errorText.className = "sectionTitle";
    errorText.innerHTML = "No entries yet!";
    websiteContainer.append(errorText);
  }
}

function listLatest(website) {
  const latestElement = website[website.length - 1];
  const entry = document.getElementById("latestSite");
  entry.href = latestElement.weblink;
  entry.innerHTML = splitLink(latestElement.weblink);
}

function deleteSite(website) {
  alert(
    `The website ${website.weblink} would get deleted from the database now. `
  );

  // deleteOne with mongodb
}

function splitLink(link) {
  return link.split(".")[1] + "." + link.split(".")[2];
}
