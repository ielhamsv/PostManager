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

    ShowAlert(message,ClassName){
        const alert=document.createElement("div")
        alert.className=`alert alert-${ClassName}`
        alert.appendChild(document.createTextNode(message))
        const place = document.getElementById("place")
        const h2 = place.querySelector("h2")
        place.insertBefore(alert,h2)

        setTimeout(function (){
            document.querySelector(".alert").remove()
        },3000)
    }
    ClearFields(){
        document.getElementById("title").value="";
        document.getElementById("author").value="";
        document.getElementById("content").value="";
    }
    DeletePost(target){
        target.parentElement.parentElement.remove()
    }
}

class Storage{
    static GetPosts(){
        let posts
        if (localStorage.getItem("posts")===null){
            posts=[]
        }
        else {
            posts=JSON.parse(localStorage.getItem("posts"))
        }
        return posts
    }
    static DisplayPosts(){
        const posts=Storage.GetPosts()
        posts.forEach(function (post){
            const ui=new UI()
            ui.AddPostToList(post)
        })
    }
    static AddPosts(post){
        const posts=Storage.GetPosts()
        posts.push(post)
        localStorage.setItem("posts",JSON.stringify(posts))
    }
    static DeletePots(title){
        const posts=Storage.GetPosts()
        posts.forEach(function (post,index){
            if (post.title===title){
                posts.splice(index,1)
            }
        })
        localStorage.setItem("posts",JSON.stringify(posts))
    }
}

document.getElementById("post-form").addEventListener("submit", function (e){
    const Title = document.getElementById("title").value;
    const Author = document.getElementById("author").value;
    const Content = document.getElementById("content").value;

    const post= new Post(Title,Author,Content);
    const ui = new UI();

    if(Title==="" || Author==="" || Content===""){
        ui.ShowAlert("Please fill out all required fields.","danger")
    }else{
        ui.AddPostToList(post);
        Storage.AddPosts(post)
        ui.ClearFields();
        ui.ShowAlert("post added successfully!","success")
    }


    e.preventDefault()
})
document.getElementById("post-list").addEventListener("click",function (e){
    const ui = new UI()
    ui.DeletePost(e.target)
    const tr=e.target.parentElement.parentElement
    const title=tr.firstElementChild.textContent
    Storage.DeletePots(title)
    ui.ShowAlert("Deleted Successfully!","success")
})
document.addEventListener("DOMContentLoaded",Storage.DisplayPosts())