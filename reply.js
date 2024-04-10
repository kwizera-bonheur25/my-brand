CKEDITOR.replace("content");
function validateForm(){
    var subject = document.getElementById("subject");
    var editor = CKEDITOR.instances["content"];
    var content = editor.getData();

    if(subject.value === ""){
        document.getElementById("subject-error-message").innerHTML = "Subject is required";
    }
}