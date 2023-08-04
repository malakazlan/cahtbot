const sendChatBtn = document.querySelector(".chat-input span");
const CahtInput = document.querySelector(".chat-input textarea");
const Cahtbox = document.querySelector(".chatbox");
const CahtbotToggler = document.querySelector(".chatbot-toggler");


let userMessage;
const API_KEY = "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";


const creatChatLi = (message, className) => {
    // creat chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : ` <span class="material-symbols-outlined">smart_toy</span> <p></p>`
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent=message;
    return chatLi;


}

const generateRespaonse = (incomingChatLi) => {

    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p")
    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ role: "user", content: userMessage }],
        })
    }

    fetch(API_URL, requestOption).then(res => res.json()).then(data => {
        messageElement.textContent = data.chocise[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Plese try again.";   
     }).finally(()=>Cahtbox.scrollTo(0, Cahtbox.scrollHeight))
 
}

const handleChat = () => {
    userMessage = CahtInput.value.trim();
    if (!userMessage) return;
    CahtInput.value="";
    //append the user messsage to the chatbox
    Cahtbox.appendChild(creatChatLi(userMessage, "outgoing"));
    Cahtbox.scrollTo(0, Cahtbox.scrollHeight);
    setTimeout(() => {
        const incomingChatLi = creatChatLi("thinking....", "incoming")
        Cahtbox.appendChild(incomingChatLi);
        Cahtbox.scrollTo(0, Cahtbox.scrollHeight);
        generateRespaonse(incomingChatLi);
    }, 600);

    
}
CahtbotToggler.addEventListener("click",()=> document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);