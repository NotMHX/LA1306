await fetch("https://localhost:7082/api/Website/add"
    , {
        method: "Delete",
        body: JSON.stringify({
            id: 0,

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });