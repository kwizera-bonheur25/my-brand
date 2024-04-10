document.addEventListener("submit", (e) => {
    e.preventDefault();

    const pop_up = document.getElementById("pop-up");

    const loader = document.getElementById("loader");
    
    function addloader(){
      loader.style.display = "flex";
      document.getElementById("send").style.display = "none";
    }

    function removepopup(){
      pop_up.style.display = "none";
    }

    function addsuccess_popup(){
      pop_up.style.display = "flex";
      setTimeout(() => {
        removepopup();
        window.location.href="/login.html";
      }, 2000)
    }

    function hideloader(){
      loader.style.display = "none";
      document.getElementById("send").style.display = "block";
    }

    const form = document.getElementById("sign-form");

    var error = document.getElementById("error-message");

    const formData = new FormData(form);

    const firstname = form.querySelector('input[name="firstname"]').value;
    const lastname = form.querySelector('input[name="lastname"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const password = form.querySelector('input[name="password"]').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    if(!firstname){
        error.style.display = "flex";
        error.innerHTML = "First name is required!";
        return;
    }
    else if(!lastname){
        error.style.display = "flex";
        error.innerHTML = "Last name is required!";
        return;
    }
    else if(!email){
        error.style.display = "flex";
        error.innerHTML = "Email is required!";
        return;
    }
    else if (!emailRegex.test(email)) {
        error.style.display = "flex";
        error.innerHTML = "Please enter a valid email address.!";
      return;
    }
    else if(!password){
        error.style.display = "flex";
        error.innerHTML = "Password is required!";
        return;
    } else if(password.length < 8){
      error.style.display = "flex";
      error.innerHTML = "Password must be atleast 8 characters!";
      return;
  }

  addloader();
  
      fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        body: formData
      })
      .then(response => response.json())
      .then(response => {
        if(response.status == 201){
          setTimeout(() => {
            hideloader();
          }, 1500)
          addsuccess_popup();
        } else {
          setTimeout(() => {
            error.style.display = "flex";
          error.innerHTML = response.message
            hideloader();
          }, 2000)
        }
      })
      .catch(error => console.error("Error:", error));
    });
  