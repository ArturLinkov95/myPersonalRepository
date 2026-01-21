const outerDiv = document.getElementById('buttonResult');

function buttonClickHandler(){
    alert('Кнопка нажата');
};

outerDiv.addEventListener('click', buttonClickHandler);