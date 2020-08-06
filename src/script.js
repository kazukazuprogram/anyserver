window.onload = () => {
  window.addMessage = (data) => {
    console.log("Message received: ");
    console.log(data);
    tr = document.createElement("tr");
    td_name = document.createElement("td");
    td_name.textContent = data["username"];
    td_mes = document.createElement("td");
    td_mes.textContent = data["message"];
    tr.appendChild(td_name);
    tr.appendChild(td_mes);
    mestable.appendChild(tr);
    meslist.scrollTop = meslist.scrollHeight;
  }
  console.log("ONLOAD");
  window.socketio = io({
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5
  });
  document.querySelector("div.container").style = "display: none";
  window.meslist = document.querySelector("div.message_list")
  registForm = document.querySelector("form.register");
  messageForm = document.querySelector("form.message");
  window.mestable = document.querySelector("div.message_list tbody")
  registForm.onsubmit = () => {
    console.log("Username:"+registForm.username.value)
    window.username = registForm.username.value
    Cookies.set('username', window.username);
    document.querySelector("div.header div.username").innerHTML = "User: "+username;
    document.querySelector("div.container").style = "";
    document.querySelector("div.welcome_message").style = "display: none;";
    document.querySelector(".message_text").focus();
    return false;
  }
  if (Cookies.get("username")) {
    window.username = Cookies.get("username");
    console.log("Arleady registered.");
    document.querySelector("div.header div.username").innerHTML = "User: "+username;
    document.querySelector("div.container").style = "";
    document.querySelector("div.welcome_message").style = "display: none;";
    document.querySelector("input.message_text").focus();
  }

  messageForm.onsubmit = () => {
    message = messageForm.message_text.value
    if (message.length == 0) {
      return false
    }
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
      addMessage(resData);
    }
  });

  // 過去のデータを取得、表示
  fetch('/api/chatdata')
    .then(response => response.json())
    .then(json => {
      for (const data of json) {
        addMessage(data);
      }
    }
  );
  document.querySelector("div.header a.logout").onclick = ()=>{
    Cookies.remove("username");
    document.querySelector("div.container").style = "display: none;";
    document.querySelector("div.welcome_message").style = "";
    document.querySelector("input.username").focus();
  }
}
