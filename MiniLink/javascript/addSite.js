document.getElementById("addBtn").onclick = () => {
  addSite();
};

async function addSite() {
  const name = document.getElementById("nameInput").value;
  const url = document.getElementById("websiteInput").value;
  const newDiv = document.getElementById("resultBox");

  // addOne with mongodb
  let result = await fetch("https://localhost:7082/api/Website/add", {
    method: "POST",
    body: JSON.stringify({
      id: 0,
      title: name,
      weblink: url,
      dateAdded: "2023-06-07T08:02:00.844Z",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  console.log(result);

  if (result.ok) {
    let resultText = document.createElement("p");
    resultText.className = "sectionDesc";
    resultText.textContent = `Successfully added site "${name}"`;
    newDiv.appendChild(resultText);

    document.getElementById("nameInput").value = "";
    document.getElementById("websiteInput").value = "";
  } else {
    alert(`${result.statusText}
    - URL must be pingable
    - URL must contain 'https://'
    - URL may already exist in directory`);
  }
}
