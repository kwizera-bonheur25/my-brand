function SingleBlog() {
  const {useState, useEffect} = React;
  const [blog, setBlog] = useState({});
  const [commentContent,setCommentContent] = useState();
  const [loading, setLoading] = useState(true);

  
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
useEffect(() => {
  fetch(`http://localhost:4000/api/blogs/${id}`)
  .then(response => response.json())
  .then(response => {
    setBlog(response.data)
    setLoading(false);
  })
}, [])

const addComment = (event) => {
  event.preventDefault();

const loggedUser = localStorage.getItem("loggedUser");
if(!loggedUser){
  window.location.href = "./login.html";
}

const token = JSON.parse(loggedUser).token;

  const comment = { content:commentContent }

  fetch(`http://localhost:4000/api/blogs/${id}/comments`, {
    method: "POST",
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
  .then(response => response.json())
  .then(response => {
    if(response.status == 201){
      location.reload()
    } else{
      window.location.href = "/login.html"
    }
  })
}

const  addLike =  (id) => {
  const loggedUser = localStorage.getItem("loggedUser");
if(!loggedUser){
  window.location.href = "./login.html";
}

const token = JSON.parse(loggedUser).token;
  fetch(`http://localhost:4000/api/blogs/${id}/likes`,{
    method:"POST",
    headers: {
      'Authorization' : `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(response => {
    location.reload();
  })
}

return (
  <>
  { loading ? (
    <div id="loader-page" class="load-page">
      <img src="./Eclipse-0.4s-231px.svg" alt=""/>
      </div>
    ): (
      <div class="card">
        <img src={blog.image} />
          <h2 class="title">{blog.title}</h2>
<div class="description"><div dangerouslySetInnerHTML={{ __html: blog.content }} /></div>          
          <div class="footer">
            <div class="profile">
              <img src={blog.author.profile} />
              <div>
                <h2 class="writter-name">{blog.author.firstname + " " + blog.author.lastname}</h2>
                {/* <h2 class="writter-position"></h2> */}
              </div>
            </div>
            <div class="reaction">
              <div onClick={() => addLike(`${blog._id}`)} class="like">
                <i class="fa-solid fa-thumbs-up"></i>
                <p>{blog.likes.length}</p>
              </div>
              <div class="like">
                <i class="fa-solid fa-comment"></i>
                <p>{blog.comments.length}</p>
              </div>
            </div>
          </div>
          <h1 class="Recent_comments">{blog.comments.length} Recent comments</h1>
          <form id="comment-form" class="comment-form">
            <input onChange = {(event) => setCommentContent(event.target.value)} id="content" name="content" type="text" placeholder="Add a comment" />
            <div class="comment-buttons">
              <button class="cancel">Cancel</button>
              <button class="Send" onClick= {() => addComment(event)}>Comment</button>
            </div>
          </form>
          <div id="comments" class="comments">
          </div>
          <div>
            {blog.comments.map((comment) => (
              <div class="profile">
              <img src={comment.author.profile} />
              <div class="comment">
                <div>
                  <h2 class="writter-name">{comment.author.firstname + " " + comment.author.lastname}</h2>
                  <h2 class="writter-position">{comment.createdAt.split('T')[0]}</h2>
                </div>
                <p>{comment.content}</p>
              </div>
            </div>
            ))}
          </div>
      </div>
    )
  }
  </>
);
}

ReactDOM.render(<SingleBlog/>, document.getElementById("single_blog"))



//  const urlParams = new URLSearchParams(window.location.search);

// const id = urlParams.get('id');
// function addloader(){
//   document.getElementById("loader-page").style.display = "flex";
// }
// addloader();
// function removeLeader(){
//   document.getElementById("loader-page").style.display = "none";
// }
// fetch(`http://localhost:4000/api/blogs/${id}`)
// .then(response => response.json())
// .then(response => {
//   console.log(blog.author.lastname);
//   removeLeader()
//   let signle_blog = document.getElementById("single_blog");
//   let newDiv = document.createElement("div");
//   newDiv.classList.add("card");
//   newDiv.innerHTML = `
  // <img src="${response.data.image}" />
  //         <h2 class="title">${response.data.title}</h2>
  //         <div class="description">${response.data.content}</div>
  //         <div class="footer">
  //           <div class="profile">
  //             <img src="${response.data.author.profile}" />
  //             <div>
  //               <h2 class="writter-name">${response.data.author.firstname + " " + response.data.author.lastname}</h2>
  //               <h2 class="writter-position">OCTOBER 03, 2018 AT 2:21PM</h2>
  //             </div>
  //           </div>
  //           <div class="reaction">
  //             <div onclick="addLike('${response.data._id}')" class="like">
  //               <i class="fa-solid fa-thumbs-up"></i>
  //               <p>${response.data.likes.length}</p>
  //             </div>
  //             <div class="like">
  //               <i class="fa-solid fa-comment"></i>
  //               <p>${response.data.comments.length}</p>
  //             </div>
  //           </div>
  //         </div>
  //         <h1 class="Recent_comments">${response.data.comments.length} Recent comments</h1>
  //         <form id="comment-form" class="comment-form">
  //           <input id="content" name="content" type="text" placeholder="Add a comment" />
  //           <div class="comment-buttons">
  //             <button class="cancel">Cancel</button>
  //             <button class="Send">Comment</button>
  //           </div>
  //         </form>
  //         <div id="comments" class="comments">
  //         </div>
//   `;
//   signle_blog.appendChild(newDiv);

//   let comment_section = document.getElementById("comments");

// for(let i = response.data.comments.length - 1; i >= 0; i--){
//     let newComment = document.createElement("div");
//     newComment.innerHTML = `
    // <div class="profile">
    //         <img src=${response.data.comments[i].author.profile} />
    //         <div class="comment">
    //           <div>
    //             <h2 class="writter-name">${response.data.comments[i].author.firstname + " " + response.data.comments[i].author.lastname}</h2>
    //             <h2 class="writter-position">${response.data.comments[i].createdAt}</h2>
    //           </div>
    //           <p>${response.data.comments[i].content}</p>
    //         </div>
    //       </div>
//     `;
//     comment_section.appendChild(newComment);
// }
// })

// function addLike(id){
//   const loggedUser = localStorage.getItem("loggedUser");
// if(!loggedUser){
//   window.location.href = "./login.html";
// }

// const token = JSON.parse(loggedUser).token;
//   addloader();
//   fetch(`http://localhost:4000/api/blogs/${id}/likes`,{
//     method:"POST",
//     headers: {
//       'Authorization' : `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => response.json())
//   .then(response => {
//     location.reload();
//   })
// }

// document.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const loggedUser = localStorage.getItem("loggedUser");
// if(!loggedUser){
//   window.location.href = "./login.html";
// }

// const token = JSON.parse(loggedUser).token;

//   const content = document.getElementById("content").value;

//   const comment = { content:content }

//   fetch(`http://localhost:4000/api/blogs/${id}/comments`, {
//     method: "POST",
//     headers: {
//       'Authorization' : `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(comment)
//   })
//   .then(response => response.json())
//   .then(response => {
//     if(response.status == 201){
//       location.reload()
//       removeLeader()
//     } else{
//       window.location.href = "/login.html"
//     }
//   })
// })