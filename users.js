const table_body = document.getElementById("table-body");
fetch("https://mybrand-be-j0te.onrender.com/api/users")
.then(response => response.json())
.then(response => {
    console.log(response.data)
    response.data.map((user) => {
        const newTr = document.createElement("tr");
        newTr.innerHTML = `
        <td><img src="${user.profile}" /></td>
                <td>${user.firstname}</td>
                <td>${user.lastname}</td>
                <td>${user.email}</td>
                <td>*************</td>
                <td>
                  <button>
                    <i class="fa-solid fa-trash"></i>
                    <p>Delete</p>
                  </button>
                </td>
        `;
        table_body.appendChild(newTr);
    })
})