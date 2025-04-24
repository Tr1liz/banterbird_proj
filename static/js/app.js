const username = "admin";
//Render Post
//We want new tweets to feel fresh — they should appear at the top, not the bottom.
function renderPost(post) {
  const template = document
    .getElementById("post-template")
    .content.cloneNode(true);
  template.querySelector(".username").innerText = post.username;
  template.querySelector(".message").innerText = post.message;

  if (isNew) {
      document.getElementById("feed").prepend(template);
    } else {
      document.getElementById("feed").appendChild(template);  
    }
  }
  
//Submit Post Function
//We want to confirm the backend accepted the tweet before showing it in the UI.
async function submitPost() {
  const message = document.getElementById("postInput").value;
  try {
    const response = await fetch("/api/add_post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message }),
    });
    if (response.ok) {
        renderPost({ username, message }, true); //pass isNew == true
        document.getElementById("postInput").value = ""; //clear the input box
    }
  } catch (error) {
    console.log("😭 Post failed", error);
  }
}

window.onload = async () => {
    try{
        const response = await fetch("/api/posts");
        const posts = await response.json();
        posts.forEach((post) => renderPost(post)); 
    } catch(error){
        console.error("FIX ITTT", error);
    }
};
