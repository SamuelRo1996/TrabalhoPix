let corpoTabela = document.getElementById('corpo-tabela');
let userNameSelect = document.getElementById('userName');
let typeSelect = document.getElementById('type');
let consultButton = document.getElementById('consultButton');

consultButton.addEventListener('click', consultarPix);
fetchUsersAndPopulateSelect();

async function fetchUsersAndPopulateSelect() {
  try {
    let response = await fetch('http://localhost:3001/buscar-usuarios');
    let usuarios = await response.json();


    userNameSelect.innerHTML = ''; 
    for (let usuario of usuarios) {
      let option = document.createElement('option');
      option.value = usuario.id;
      option.text = usuario.name;
      userNameSelect.appendChild(option);
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}

async function consultarPix() {
  const userId = userNameSelect.value;
  const type = typeSelect.value;


  try {
    const apiUrl = `http://localhost:3001/consultar-pix/${userId}/${type}`;
    const response = await fetch(apiUrl);
    const usuarios = await response.json();

    corpoTabela.innerHTML = ''; 

    for (let usuario of usuarios) {
      let tr = document.createElement('tr');
      let tdId = document.createElement('td');
      let tdNameSender = document.createElement('td');
      let tdNameRecipient = document.createElement('td');
      let tdCreatedAt = document.createElement('td');
      let tdValue = document.createElement('td');

      tdId.innerText = usuario.id;
      tdCreatedAt.innerText = usuario.createdAt;
      tdValue.innerText = usuario.value;
      tdNameSender.innerText = usuario.sender.name;
      tdNameRecipient.innerText = usuario.recipient.name;

      tr.appendChild(tdId);
      tr.appendChild(tdNameSender);
      tr.appendChild(tdNameRecipient);
      tr.appendChild(tdCreatedAt);
      tr.appendChild(tdValue);

      corpoTabela.appendChild(tr);
    }
  } catch (error) {
    console.error('Erro ao consultar PIX:', error);
  }
}
