window.onload = () => {
  console.log("ONLOAD");
  document.querySelector("div.container").style = "display: none";
  registForm = document.querySelector("form.register");
  registForm.onsubmit = () => {
    console.log("Username:"+registForm.username.value)
    window.username = registForm.username.value
    Cookies.set('username', window.username);
    document.querySelector("div.container").style = "";
    document.querySelector("div.welcome_message").style = "display: none;";
    return false;
  }
  if (Cookies.get("username")) {
    // ユーザー名が既にある
  }
  document.querySelector("form.message").onsubmit = () => {
    console.log("Message send.");
    return false;
  }
}
