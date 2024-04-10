const table_data = document.getElementById("table-data");
const pop_up = document.getElementById("pop-up");

function addsuccess_popup(data){
    console.log(data);
    pop_up.style.display = "flex";
    document.getElementById("message").innerHTML =` ${data.message} `;
    setTimeout(() => {
      location.reload();
      removepopup();
    }, 2000)
  }

  function removepopup(){
    pop_up.style.display = "none";
  }
fetch("http://localhost:4000/api/queries")
.then(response => response.json())
.then(response => {
    response.data.map((message) => {
        let newTr = document.createElement("tr");
        newTr.innerHTML = `
        <td>${message.email}</td>
        <td>${message.message.substring(0,45) + '...'}</td>
                <td class = 'button'>  
                  <button onclick = "delete_message('${message._id}')">
                    <i class="fa-solid fa-trash"></i>
                  </button>
        <button>
        <i class="fa-solid fa-paper-plane"></i>
        <p>Reply</p>
        </button>
        </td>
        `;
        table_data.appendChild(newTr);
    })
})

function delete_message(id){
    fetch(`http://localhost:4000/api/queries/${id}`, {
    method: 'DELETE'
})
    .then(response => response.json())
    .then(response => {
        if(response.status == 200){
              setTimeout(() => {
                }, 1500)
                addsuccess_popup(response);
          }
    })
}