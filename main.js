const button = document.getElementById("button");

const input = document.getElementById('input');

function gendorize(name) {
    return fetch(`https://api.genderize.io/?name=${name}`)
        .then(response => response.json())
        .then(result => {
            const gender = result.gender;
            if (gender === 'male') {
                alert(`${name} is male`);
            }
            else {
                alert(`${name} is female`);
            }
        })
};

button.addEventListener('click', function (event) {
    event.preventDefault();
    gendorize(input.value);
    input.value = "";
});