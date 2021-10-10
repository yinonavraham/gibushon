import './css/app.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registered: ', registration);
        }).catch(registrationError => {
            console.log('ServiceWorker registration failed: ', registrationError);
        });
    });
}

const content = document.getElementById("content");

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => {
        let people = data;
        let ul = document.createElement('ul');
        content.appendChild(ul);

        return people.map(function(person) {
            let li = document.createElement('li');
            let span = document.createElement('span');

            li.innerHTML = person.name;
            span.innerHTML = person.email;

            li.appendChild(span);
            ul.appendChild(li);
        });
    })
