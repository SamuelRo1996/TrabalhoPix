let senderIdInput = document.getElementById('senderIdInput') ;
let recipientIdInput = document.getElementById('recipientIdInput');
let valueInput = document.getElementById('valueInput');
let submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click',  () => {
  let senderId = senderIdInput.value;
  let recipientId = recipientIdInput.value;
  let value = valueInput.value;

  let data = {
    senderId: senderId,
    recipientId: recipientId,
    value: value,
  };

  let apiPostUrl = 'http://localhost:3001/realizar-pix'; 

 
    fetch(apiPostUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

