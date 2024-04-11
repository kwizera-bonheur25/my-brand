function AllBlogs() {
  const { useState, useEffect } = React;
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mybrand-be-j0te.onrender.com/api/blogs")
      .then((response) => response.json())
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);

        let blogs = document.querySelectorAll(".my-blog .slider .item");
        let next = document.getElementById("next-blog");
        let prev = document.getElementById("prev-blog");
        let active = 1;
        function loadShow() {
          let stt = 0;
          console.log(blogs[active]);
          blogs[active].style.transform = `none`;
          blogs[active].style.zIndex = 10;
          blogs[active].style.filter = "none";
          blogs[active].style.opacity = 1;
          for (var i = active + 1; i < blogs.length; i++) {
            stt++;
            blogs[i].style.transform = `translateX(${120 * stt}px) scale(${
              1 - 0.2 * stt
            }) perspective(16px) rotateY(-1deg)`;
            blogs[i].style.zIndex = 1;
            blogs[i].style.filter = "blur(5px)";
            blogs[i].style.opacity = stt > 2 ? 0 : 0.6;
          }
          stt = 0;
          for (var i = active - 1; i >= 0; i--) {
            stt++;
            blogs[i].style.transform = `translateX(${-120 * stt}px) scale(${
              1 - 0.2 * stt
            }) perspective(16px) rotateY(1deg)`;
            blogs[i].style.zIndex = 1;
            blogs[i].style.filter = "blur(5px)";
            blogs[i].style.opacity = stt > 2 ? 0 : 0.6;
          }
        }
        loadShow();
        next.onclick = function () {
          active = active + 1 < blogs.length ? active + 1 : active;
          loadShow();
        };
        prev.onclick = function () {
          active = active - 1 >= 0 ? active - 1 : active;
          loadShow();
        };
      });
  }, []);

  return (
    <>
      {loading ? (
        <div id="loader-page" class="load-page">
          <img src="./Eclipse-0.4s-231px.svg" alt="" />
        </div>
      ) : (
        <>
          <button id="next-blog"> next </button>
          <button id="prev-blog"> prev </button>
          {blogs.map((blog, index) => (
            <>
              <div class="item">
                <a
                  href= {`signle_blog.html?id=${blog._id}`}
                >
                  <img key={index} src={blog.image} alt={`Image ${index}`} />
                </a>
                <h2 class="title">{blog.title.substring(0, 50) + " ...."}</h2>
                <div class="description"><div dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 196) + " ....."}} /></div>          
                <div class="footer">
                  <div class="profile">
                    <img src={blog.author.profile} />
                    <div>
                      <h2 class="writter-name">{blog.author.firstname}</h2>
                      <h2 class="writter-position">{blog.author.lastname}</h2>
                    </div>
                  </div>
                  <div class="reaction">
                    <div class="like">
                      <i class="fa-solid fa-thumbs-up"></i>
                      <p>{blog.likes.length}</p>
                    </div>
                    <div class="like">
                      <i class="fa-solid fa-comment"></i>
                      <p>{blog.comments.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
}

ReactDOM.render(<AllBlogs />, document.getElementById("blog-posts"));

// var sidebar = document.getElementById("nav-container");
// var close = document.getElementById("close");
// var open = document.getElementById("open");
// var posts = JSON.parse(localStorage.getItem("Blogs"));

// var posts;

// function addloader(){
//   document.getElementById("loader-page").style.display = "flex";
// }
// addloader();
// function removeLeader(){
//   document.getElementById("loader-page").style.display = "none";
// }

// fetch('https://mybrand-be-j0te.onrender.com/api/blogs')
// .then(response => response.json())
// .then((response) => {
//   removeLeader()
//   var blog_posts = document.getElementById("blog-posts");
//   response.data.map((blog) => {
//     console.log(blog);
//     let newDiv = document.createElement("div");
//     newDiv.classList.add("item");
//     newDiv.innerHTML = `
//     <a href="#" onclick="window.location.href = 'signle_blog.html?id=${blog._id}'; return false;">
//             <img src="${blog.image}" />
//           </a>
//           <h2 class="title">${blog.title.substring(0,50) + ' ....'}</h2>
//           <div class="description">${blog.content.substring(0, 196) + ' .....'}</div>
//           <div class="footer">
//             <div class="profile">
//               <img src="${blog.author.profile}" />
//               <div>
//                 <h2 class="writter-name">${blog.author.firstname}</h2>
//                 <h2 class="writter-position">${blog.author.lastname}</h2>
//               </div>
//             </div>
//             <div class="reaction">
//               <div class="like">
//                 <i class="fa-solid fa-thumbs-up"></i>
//                 <p>${blog.likes.length}</p>
//               </div>
//               <div class="like">
//                 <i class="fa-solid fa-comment"></i>
//                 <p>${blog.comments.length}</p>
//               </div>
//             </div>
//           </div>
//     `;
//     blog_posts.appendChild(newDiv)

//   })

// // })

function openSidebar() {
    sidebar.style.display = "flex";
    close.style.display = "flex";
    open.style.display = "none";
    }

function closeSidebar() {
    sidebar.style.display = "none";
    close.style.display = "none";
    open.style.display = "flex";
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("nav-bar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.scrollY >= sticky) {
    console.log("Scrolled");
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// document.addEventListener("submit", (e) => {
//   e.preventDefault();

//   var email = document.getElementById('email').value.trim();
//     var message = document.getElementById('message').value.trim();

//     var emailError = document.getElementById('email-error-message');
//     var messageError = document.getElementById('message-error-message');

//     var isValid = true;

//     // Validate email: using a simple regex for basic validation
//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//         emailError.innerText = "Invalid email address";
//         return
//     } else {
//         emailError.innerText = "";
//     }

//     // Validate message: should be at least 4 characters long
//     if (message === "") {
//         messageError.innerText = "Please enter a message.";
//         return
//     }  else if(message.length < 5){
//         messageError.innerHTML = "Message must have more then 5 characters.";
//       return
//     }

//     const sentMessage = {
//       email:email,
//       message:message
//     }

//     const pop_up = document.getElementById("pop-up");

//     const loader = document.getElementById("loader");

//     function addloader(){
//       loader.style.display = "flex";
//       document.getElementById("send").style.display = "none";
//     }
//     addloader();
//     function removepopup(){
//       pop_up.style.display = "none";
//     }

//     function addsuccess_popup(){
//       pop_up.style.display = "flex";
//       setTimeout(() => {
//         removepopup();
//         window.location.href="/#contact";
//       }, 2000)
//     }

//     function hideloader(){
//       loader.style.display = "none";
//       document.getElementById("send").style.display = "block";
//     }

//     fetch("https://mybrand-be-j0te.onrender.com/api/queries",{
//       method: "POST",
//       headers:{
//         'Content-Type' : 'application/json'
//       },
//       body: JSON.stringify(sentMessage)
//     })
//     .then(response => response.json())
//     .then(response => {
//       if(response.status == 201){
//         setTimeout(() => {
//           hideloader();
//         }, 1500)
//         addsuccess_popup();
//       }
//     })

// })

    document.addEventListener("DOMContentLoaded", function() {
        let projects = document.querySelectorAll('.projects-section .slider .item');
        let next_project = document.getElementById('next-project');
        let prev_project = document.getElementById('prev-project');

        let active_project = 3;

        function loadShow(){
            let stt = 0;
            projects[active_project].style.transform = `none`;
            projects[active_project].style.zIndex = 10;
            projects[active_project].style.filter = 'none';
            projects[active_project].style.opacity = 1;
            for(var i = active_project + 1; i < projects.length; i++){
                stt++;
                projects[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
                projects[i].style.zIndex = 1;
                projects[i].style.filter = 'blur(5px)';
                projects[i].style.opacity = stt > 2 ? 0 : 0.6;
            }
            stt = 0;
            for(var i = active_project - 1; i >= 0; i--){
                stt++;
                projects[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
                projects[i].style.zIndex = 1;
                projects[i].style.filter = 'blur(5px)';
                projects[i].style.opacity = stt > 2 ? 0 : 0.6;
            }
        }

        loadShow();

        next_project.onclick = function(){
            active_project = active_project + 1 < projects.length ? active_project + 1 : active_project;
            loadShow();
        }

        prev_project.onclick = function(){
            active_project = active_project - 1 >= 0 ? active_project - 1 : active_project;
            loadShow();
        }
});
