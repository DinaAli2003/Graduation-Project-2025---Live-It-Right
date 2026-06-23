const prompt = document.querySelector('#prompt');
const submit = document.querySelector('#Send');
let chatContainer = document.querySelector('.chat-container');

let imagebtn = document.querySelector('#Image');
let image = document.querySelector('#Image img');
let imageInput = document.querySelector('#Image input');
let load = document.querySelector('.load');

function createBox(html, classes) {
    let div = document.createElement('div');
    div.innerHTML = html;
    div.classList.add(classes);
    return div;
}

const Api_Url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBdRmtxCKMaj5_4PGtz0EAIFb_upKiFQjQ";

let user = {
    data1: null,
    file: {
        mime_type: null,
        data: null
    }
};

async function generateChatResponse(ai_box) {
    let text = ai_box.querySelector('.Ai-chat-area');
    let reqOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "contents": [{ "parts": [{ "text": user.data1 }, (user.file.data ? [{ inline_data: user.file }] : [])] }]
        })
    };
    try {
        let res = await fetch(Api_Url, reqOption);
        let data = await res.json();
        let apiRes = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
        text.innerHTML = apiRes;
    } catch (error) {
        console.log(error);
    } finally {
        chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
        image.src = `upload file icon.png`;
        image.classList.add('choose');
        user.file = {};
    }
}

function chatResponse(message) {
    user.data1 = message;
    let html = `<img width="10%" src="./User.png" alt="" id="userImage" width="50">
                <div class="user-chat-area">${user.data1}
                    ${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
                </div>`;
    prompt.value = "";
    let userChatArea = createBox(html, 'user-chat');
    chatContainer.appendChild(userChatArea);
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    html = '';
    setTimeout(() => {
        html = `<img src="./AI.png" alt="" id="AiImage" width="50">
                <div class="Ai-chat-area"><img src="./loading.svg" alt="" width="20px" class="load"></div>`;
        let aiChatArea = createBox(html, 'Ai-chat');
        chatContainer.appendChild(aiChatArea);
        generateChatResponse(aiChatArea);
    }, 600);
}

// Event listener for pressing "Enter" in the input field
prompt.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        let val = prompt.value.trim();
        if (val) chatResponse(val);
    }
});

// Event listener for clicking the "Send" button
submit.addEventListener('click', () => {
    let val = prompt.value.trim();
    if (val) chatResponse(val);
});

// Event listener for selecting an image file
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        let base64 = e.target.result.split(',')[1];
        user.file = {
            mime_type: file.type,
            data: base64
        };
        image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
        image.classList.add('choose');
    };
    reader.readAsDataURL(file);
});



// Event listener for selecting a file (not just image)
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        let base64 = e.target.result.split(',')[1];
        user.file = {
            mime_type: file.type,
            data: base64
        };

        // لو كان صورة، نعرضها
        if (file.type.startsWith("image/")) {
            image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
            image.classList.add('choose');
        } else {
            // إذا مش صورة، نعرض أيقونة تحميل أو اسم الملف
            image.src = `upload file icon.png`; // أيقونة افتراضية للملفات
            image.classList.add('choose');
        }
    };
    reader.readAsDataURL(file);
});

let html = `<img width="10%" src="upload file icon.png" alt="" id="userImage" width="50">
    <div class="user-chat-area">${user.data1}
        ${
            user.file.data
                ? user.file.mime_type.startsWith("image/")
                    ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`
                    : `<div class="file-preview">📄 (${user.file.mime_type.split('/')[1]})</div>`
                : ""
        }
    </div>`;

// Event listener for clicking the "Upload File" button
imagebtn.addEventListener('click', () => {
    imagebtn.querySelector('input').click();
});

// Ensure the "download file" icon remains visible after bot responses
function preservePromptArea() {
    const promptArea = document.querySelector('.prompt-area');
    const mainContainer = document.querySelector('.main-container');
    if (!mainContainer.contains(promptArea)) {
        mainContainer.appendChild(promptArea);
    }
}

// Call preservePromptArea after every DOM update
const observer = new MutationObserver(() => {
    preservePromptArea();
});
observer.observe(chatContainer, { childList: true, subtree: true });


document.getElementById('Send').addEventListener('click', function () {
    const promptInput = document.getElementById('prompt');
    const userMessage = promptInput.value.trim();

    if (userMessage) {
        // Append user message to the chat
        const userChatArea = document.querySelector('.user-chat-area');
        const userChatDiv = document.createElement('div');
        userChatDiv.textContent = userMessage;
        userChatArea.appendChild(userChatDiv);
        document.querySelector('.user-chat').hidden = false;

        // Clear the input field but preserve the file input
        promptInput.value = '';

        // Simulate bot response
        const aiChatArea = document.querySelector('.Ai-chat-area');
        const botResponse = document.createElement('div');
        botResponse.textContent = 'Processing your request...';
        aiChatArea.appendChild(botResponse);

        // Ensure the file input and its icon remain intact
        const fileInput = document.querySelector('#Image input[type="file"]');
        if (fileInput.files.length > 0) {
            console.log('File is still selected:', fileInput.files[0].name);
        }
    }
});