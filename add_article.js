    var imageInput = document.getElementById("input-file");
    var titleInput = document.getElementById("title");
    var imageData;
    CKEDITOR.replace("content");
    var description = CKEDITOR.instances.content;
    imageInput.addEventListener("change", (e) => {
      var image = imageInput.files[0];
      const reader = new FileReader();
      reader.onload = function(event) {
          imageData = event.target.result;;
      };
      
      reader.readAsDataURL(image);
  });

  function previewImage(event) {
    var input = event.target;
    var imgView = input.parentElement.querySelector("#img-view img");

    var file = input.files[0];
    var reader = new FileReader();

    reader.onload = function () {
        imgView.src = reader.result;
    };

    reader.readAsDataURL(file);
} 

document.addEventListener("submit", (e) => {
  e.preventDefault()
  const pop_up = document.getElementById("pop-up");
  const loader = document.getElementById("loader");
  var imageErrorMessage = document.getElementById("image-error-message");
    var titleErrorMessage = document.getElementById("title-error-message");
    var descriptionErrorMessage = document.getElementById("description-error-message");

    // Reset error messages
    imageErrorMessage.textContent = "";
    titleErrorMessage.textContent = "";
    descriptionErrorMessage.textContent = "";
    // Image validation
    if (imageInput.files.length === 0) {

        imageErrorMessage.innerHTML = "Please upload an image.";
        
        return;
    }

    // Title validation
    if (titleInput.value.trim() === "") {
      titleErrorMessage.textContent = "Please enter a title.";
      
      return;
  } else if (/\d/.test(titleInput.value)) {
      titleErrorMessage.textContent = "Title should not contain numbers.";
      
      return;
  }
    if (description.getData().trim() === "") {
      descriptionErrorMessage.textContent = "Please enter a description.";
      
      return;
  }  else if(description.getData().length < 13){
    descriptionErrorMessage.textContent = "Description must have more then 5 characters.";
    
    return;
  }

  function addloader(){
    loader.style.display = "flex";
    document.getElementById("send").style.display = "none";
  }
  addloader();

  function removepopup(){
    pop_up.style.display = "none";
  }

  function addsuccess_popup(data){
    console.log(data);
    document.getElementById("msg").innerHTML = `${data.message}`
    pop_up.style.display = "flex";
    setTimeout(() => {
      removepopup();
    }, 2000)
  }

  function hideloader(){
    loader.style.display = "none";
    document.getElementById("send").style.display = "flex";
  }

  const form = document.getElementById("blog-form");
  const formData = new FormData(form);
  const token = JSON.parse(localStorage.getItem("loggedUser")).token;
  
  fetch("http://localhost:4000/api/blogs",{
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${token}`
        },
        body: formData
      })
      .then(response => response.json())
      .then(response => {

        console.log(response);
        
        if(response.status == 201){
              hideloader();
              addsuccess_popup(response.data);
              setTimeout(() => {
                location.reload();
              }, 3600);
        } else {
          hideloader();
          titleErrorMessage.innerHTML = response.message;
        }
      })
      .catch(error => console.log("Error fetching data", error))

})

