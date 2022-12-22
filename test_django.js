const submitButton = document.querySelector('#submit-button');
const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.stopPropagation();
  event.preventDefault();
  const formData = new FormData(form);
  const options = {
    method: 'POST',
    body: formData,
  }
  const url = form.getAttribute('action');
  fetch(url, options);
});

async function callApi() {
  const res = await fetch("http://127.0.0.1:8000/mosaics/");
  const users = await res.json();
  console.log(users);
  console.log(users["result"]);
  var elem = document.getElementById("image01");
  elem.src = "http://127.0.0.1:8000/" + users["result"];
}