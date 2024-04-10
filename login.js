document.addEventListener("submit", (e) => {
    e.preventDefault()
    const pop_up = document.getElementById("pop-up");
    const loader = document.getElementById("loader");

    const form = document.getElementById("login-form");

    var error = document.getElementById("error-message");

    function addloader(){
        loader.style.display = "flex";
        document.getElementById("send").style.display = "none";
      }

      function removepopup(){
        pop_up.style.display = "none";
      }
  
      function addsuccess_popup(data){
        console.log(data);
        pop_up.style.display = "flex";
        setTimeout(() => {
          data.role == "user" ? window.location.href="/index.html" : window.location.href="/dashboard.html" ;
          removepopup();
        }, 2000)
      }

      function hideloader(){
        loader.style.display = "none";
        document.getElementById("send").style.display = "block";
      }
  

    const formData = new FormData(form);

    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email){
        error.style.display = "flex";
        error.innerHTML = "Email is required!";
        return;
    } else if (!emailRegex.test(email)) {
        error.style.display = "flex";
        error.innerHTML = "Please enter a valid email address.!";
      return;
    }
    else if(!password){
        error.style.display = "flex";
        error.innerHTML = "Password is required!";
        return;
    }
    addloader();
    fetch("http://localhost:4000/api/users/login",{
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(response => {
        if(response.status == 200){
          localStorage.setItem('loggedUser', JSON.stringify(response.data));
            setTimeout(() => {
                hideloader();
              }, 1500)
              addsuccess_popup(response.data);
        } else {
            setTimeout(() => {
                error.style.display = "flex";
              error.innerHTML = response.message
                hideloader();
              }, 2000)
        }
    })
})