class Post{
    constructor(title,author,content) {
        this.title=title
        this.author=author
        this.content=content
    }
}

class UI{
    AddPostToList(post){
        const list = document.getElementById("post-list");
        const row=document.createElement("tr");
        row.innerHTML=`
        <th>${post.title}</th>
        <td>${post.author}</td>
        <td>${post.content}</td>
        <td><i class="ri-delete-bin-line text-danger"></i></td>
        `
        list.appendChild(row)
}
    ClearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("content").value="";
    }
}

document.getElementById("post-form").addEventListener("submit", function (e){
    const Title = document.getElementById("title").value;
    const Author = document.getElementById("author").value;
    const Content = document.getElementById("content").value;

    const post= new Post(Title,Author,Content);

    const ui = new UI();
    ui.AddPostToList(post);
    ui.ClearFields();

    e.preventDefault()
})
