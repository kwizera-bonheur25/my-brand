function addloader(){
  document.getElementById("loader-page").style.display = "flex";
}
addloader();
function removeLeader(){
  document.getElementById("loader-page").style.display = "none";
}
fetch("https://mybrand-be-j0te.onrender.com/api/blogs")
.then (response => response.json())
.then(response => {
  removeLeader();
  response.data.map((item) => {
    let newTr = document.createElement("tr");
    newTr.innerHTML = `
                <td>
                  <img
                    src="${item.image}"
                  />
                </td>
                <td>${item.title.substring(0,24) + '...'}</td>
                <td>${item.content.substring(0,40) + '...'}</td>
                <td>${item.author.firstname}</td>
                <td>${item.likes.length}</td>
                <td>${item.comments.length}</td>
                <td>
                  <button onclick="window.location.href = 'signle_blog.html?id=${item._id}'; return false;">
                  <i class="fa-regular fa-eye"></i>
                  </button>
                </td>
                <td>
                  <button onclick="updateBlog('${item._id}')">
                  <i class="fa-solid fa-pen"></i>
                  </button>
                </td>
                <td>  
                  <button onclick="deleteBlog('${item._id}')">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
    `
    table_body.appendChild(newTr);
});
})
function deleteBlog(id){
  addloader();
  const token = JSON.parse(localStorage.getItem("loggedUser")).token;
  fetch(`https://mybrand-be-j0te.onrender.com/api/blogs/${id}`,{
    method: "DELETE",
    headers:{
      "Authorization" : `Bearer ${token}`,
      'Content-Type' : "application/json"
    }
  })
  .then(response => response.json())
  .then(response => {
    if(response.status == 200){
      location.reload();
    } else {
      window.location.href = "./login.html"
    }
  })
}

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

var blogId;

function updateBlog(id){

  blogId = id;
  document.getElementById("blog-form").style.display = "grid";
  fetch(`https://mybrand-be-j0te.onrender.com/api/blogs/${id}`)
  .then(response => response.json())
  .then(response => {
    var imgView = document.querySelector("#img-view img");
    imgView.src = response.data.image;
    const title = document.getElementById("title");
    var description = CKEDITOR.instances.content;
    title.value = `${response.data.title}`
    description.setData(`${response.data.content}`)
  })
}
const pop_up = document.getElementById("pop-up");

const form = document.getElementById("update-form");
form.addEventListener("submit",(e) => {
  e.preventDefault();

  function addloader(){
    loader.style.display = "flex";
    document.getElementById("send").style.display = "none";
  }

  addloader();

  function hideloader(){
    loader.style.display = "none";
    // window.location.reload()
  }
  function removepopup(){
    pop_up.style.display = "none";
  }

  function addsuccess_popup(data){
    console.log(data);
    pop_up.style.display = "flex";
    setTimeout(() => {
      removepopup();
      location.reload();
    }, 2000)
  }


  const token = JSON.parse(localStorage.getItem("loggedUser")).token;
  const formData = new FormData(form);

  console.log(typeof CKEDITOR.instances.content.getData());

  const content = CKEDITOR.instances.content.getData()
  formData.append('content', content);

  fetch(`https://mybrand-be-j0te.onrender.com/api/blogs/${blogId}`,{
        method: "PATCH",
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
                hideloader()
              }, 3600);
        } else {
          hideloader();
          titleErrorMessage.innerHTML = response.message;
        }
      })
})