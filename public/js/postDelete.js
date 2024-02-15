const deletePost = async (post) => {
    const response = await fetch(`/api/posts/${post}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Error: Post not deleted");
    }
};
  
const deletedPostHandler = async (event) => {
    event.preventDefault();
  
    if (event.target.matches('.post-delete')) {
        const post = event.target.getAttribute('data-post-id');
        deletePost(post);
        console.log('help');
    }
}
  
document
    .querySelector('.post-delete')
    .addEventListener('click', deletedPostHandler);