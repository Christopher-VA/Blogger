const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const post_id = parseInt(window.location.pathname.split('/').pop());
  
    const content = document.querySelector('#commenter').value.trim();
  
    if (content) {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ comment: content, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        console.log('Response status:', response.status);
        console.log('Response text:', await response.text());
        alert('Comment Failed.');
      }
    }
  };
  
document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);
    
