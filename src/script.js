window.onload = () => {
  console.log("ONLOAD");
  window.socketio = io({
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5
  });
  document.querySelector("div.container").style = "display: none";
  registForm = document.querySelector("form.register");
  messageForm = document.querySelector("form.message");
  window.mestable = document.querySelector("div.message_list tbody")
  registForm.onsubmit = () => {
    console.log("Username:"+registForm.username.value)
    window.username = registForm.username.value
    Cookies.set('username', window.username);
    document.querySelector("div.container").style = "";
    document.querySelector("div.welcome_message").style = "display: none;";
    return false;
  }
  if (Cookies.get("username")) {
    window.username = Cookies.get("username");
    console.log("Arleady registered.");
    document.querySelector("div.container").style = "";
    document.querySelector("div.welcome_message").style = "display: none;";
  }

  messageForm.onsubmit = () => {
    message = messageForm.message_text.value
    send_mes = {
      "type": "message",
      "username": username,
      "message": message
    }
    console.log("Send message: " + message);
    socketio.emit('message', JSON.stringify(send_mes));
    messageForm.message_text.value = "";
    return false;
  }

  socketio.on('message',(msg) => {
    resData = JSON.parse(msg);
    if (resData["type"] == "message_received") {
      console.log("Message received: ");
      console.log(resData);
      tr = document.createElement("tr");
      td_name = document.createElement("td");
      td_name.textContent = resData["username"];
      td_mes = document.createElement("td");
      td_mes.textContent = resData["message"];
      tr.appendChild(td_name);
      tr.appendChild(td_mes);
      mestable.appendChild(tr);
    }
  });
}
