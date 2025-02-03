document.addEventListener('DOMContentLoaded', () => {
    const subjects = ['chinese', 'math', 'english', 'physics', 'chemistry', 'biology'];

    subjects.forEach(subject => {
        const form = document.getElementById(`${subject}-form`);
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const textarea = form.querySelector('textarea');
            const fileInput = form.querySelector('input[type="file"]');
            const questionText = textarea.value;
            const file = fileInput.files[0];

            if (questionText) {
                const questionList = document.getElementById(`${subject}-questions`);
                const questionItem = document.createElement('div');
                questionItem.classList.add('question-item');
                questionItem.innerHTML = `
                    <p>${questionText}</p>
                    ${file ? `<img src="${URL.createObjectURL(file)}" alt="uploaded image">` : ''}
                    <div class="comments">
                        <h4>评论</h4>
                        <div class="comments-list"></div>
                        <textarea placeholder="发表评论..."></textarea>
                        <button class="comment-submit">提交评论</button>
                    </div>
                `;
                questionList.appendChild(questionItem);
                textarea.value = '';
                fileInput.value = '';

                const commentButton = questionItem.querySelector('.comment-submit');
                commentButton.addEventListener('click', () => {
                    const commentTextarea = questionItem.querySelector('textarea');
                    const commentText = commentTextarea.value;
                    if (commentText) {
                        const commentsList = questionItem.querySelector('.comments-list');
                        const commentItem = document.createElement('div');
                        commentItem.classList.add('comment-item');
                        commentItem.innerHTML = `<p>${commentText}</p><button class="score-btn">打分</button>`;
                        commentsList.appendChild(commentItem);
                        commentTextarea.value = '';
                    }
                });
            }
        });
    });
});