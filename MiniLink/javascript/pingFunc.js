// This would be the ping command for the backend that we don't have.

export function ping(ip) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `${ip}/`);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

    xhr.onreadystatechange = () => {
      if (xhr.status == 200 && this.readyState == 4) {
        resolve(true);
      } else {
        resolve(false);
      }
    };

    xhr.onerror = () => {
      resolve(false);
    };

    xhr.send();
  });
}
