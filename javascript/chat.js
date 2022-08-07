const form = document.querySelector('.typing-area'),
  incoming_id = form.querySelector('.incoming_id').value,
  inputField = form.querySelector('.input-field'),
  sendBtn = form.querySelector('button'),
  chatBox = document.querySelector('.chat-box');

form.onsubmit = (e) => {
  e.preventDefault();
};

inputField.focus();
inputField.onkeyup = () => {
  if (inputField.value != '') {
    sendBtn.classList.add('active');
  } else {
    sendBtn.classList.remove('active');
  }
};

sendBtn.onclick = () => {
  let formData = new FormData(form);

  fetch('php/insert-chat.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      inputField.value = '';
    });
};

chatBox.onmouseenter = () => {
  chatBox.classList.add('active');
};

chatBox.onmouseleave = () => {
  chatBox.classList.remove('active');
};

setInterval(() => {
  /*   fetch('php/get-chat.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `incoming_id=${incoming_id}`,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      chatBox.innerHTML = data;

      if (!chatBox.classList.contains('active')) {
        scrollToBottom();
      }
    }); */

  let xhr = new XMLHttpRequest();

  xhr.open('POST', 'php/get-chat.php', true);
  xhr.onload = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        let data = xhr.response;

        chatBox.innerHTML = data;

        if (!chatBox.classList.contains('active')) {
          scrollToBottom();
        }
      }
    }
  };
  xhr.setRequestHeader(
    'Content-type',
    'application/x-www-form-urlencoded'
  );
  xhr.send('incoming_id=' + incoming_id);
}, 500);

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}
