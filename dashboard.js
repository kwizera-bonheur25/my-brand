const loggedUser = localStorage.getItem("loggedUser");

if (!loggedUser) {
  window.location.href = "login.html";
} else {
  const token = JSON.parse(loggedUser).token;
  
  if (token === "") {
    window.location.href = "login.html";
  }
}
function logout(){
  localStorage.removeItem("loggedUser")
  window.location.href = "login.html"
}


var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");
let total_queries;
let total_blogs;
let total_likes;
let total_comments;
let total_users;

 Promise.all([fetch("http://localhost:4000/api/blogs").then(response => response.json())
 ,fetch("http://localhost:4000/api/queries").then(response => response.json()),
 fetch("http://127.0.0.1:4000/api/blogs/likes/likes").then(response => response.json()),
 fetch("http://127.0.0.1:4000/api/blogs/comments/comments").then(response => response.json()),
 fetch("http://localhost:4000/api/users").then(response => response.json())
])
 .then(([blogResponse, queryResponse, likesResponse, commentsResponse, usersResponse]) => {
  total_blogs = blogResponse.data.length
  total_queries = queryResponse.data.length;
  total_likes = likesResponse.data.length;
  total_comments = commentsResponse.data.length;
  total_users = usersResponse.data.length;

  document.getElementById("total-blogs").innerHTML = total_blogs;
  document.getElementById("total-queries").innerHTML = total_queries;
  document.getElementById("total-likes").innerHTML = total_likes;
  document.getElementById("total-comments").innerHTML = total_comments;
  document.getElementById("total-users").innerHTML = total_users;

const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Total likes", "Blogs", "Comments", "Querries", "Users"],
    datasets: [
      {
        label: "# of Votes",
        data: [total_likes, total_blogs, total_comments, 5, total_queries, 3],
        backgroundColor: ["#AAD786"],
        borderColor: ["#70FF00"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

 })

function openSidebar() {
    if(!sidebarOpen){
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if(sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// When the DOM is fully loaded, execute the script

  // Get the header
  var header = document.getElementById("header");
  
  // Check if the header element exists
  if (header) {
    // Get the offset position of the header
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      console.log("Scroll position:", window.scrollY);
      console.log("Sticky position:", sticky);
      if (window.scrollY >= sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    // When the user scrolls the page, execute myFunction
    window.onscroll = function() { myFunction() };
  } else {
    console.error("Header element not found!");
  }
