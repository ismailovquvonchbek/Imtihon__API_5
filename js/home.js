const elClose = document.querySelector(".close__btn")


const elList1 = document.querySelector(".home__list1");
const elTemp1 = document.querySelector("#home__temp1").content;

const elList2 = document.querySelector(".home__list2")
const elTemp2 = document.querySelector("#temp__eser").content

const elList3 = document.querySelector(".home__list3")
const elTemp3 = document.querySelector("#temp__comment").content

// ============ Token Remove ======================

const token = window.localStorage.getItem('token')

if(!token) {
    window.location.replace('login.html')
}

elClose.addEventListener('click', () => {
    window.localStorage.removeItem('token')
    window.location.replace('login.html')
})

// ================= New Arrays ===============

let userArray = [];
let postArray = [];
let commentArray = [];

// =================== Users =========================

function Render1(node, array) {
    array.innerHTML = null

    node.forEach((element) => {
        const template1 = elTemp1.cloneNode(true);

        template1.querySelector('.home__btn1').textContent = element.id;
        template1.querySelector('.home__heading1').textContent = element.name;
        template1.querySelector('.home__p1').textContent = element.username;
        template1.querySelector('.home__email1').textContent = element.email;
        template1.querySelector('.home__next1').dataset.userId = element.id;
        array.appendChild(template1)
    });
}

async function userAPI() {
    const userRes = await fetch('https://jsonplaceholder.typicode.com/users')
    const userData = await userRes.json()
    Render1(userData, elList1)
}

userAPI()

// =========================== Post ==============================

function Render2(free, moli) {

    moli.innerHTML = null;

    free.forEach(usersonly => {
        const template2 = elTemp2.cloneNode(true);

        template2.querySelector('.userID__2').textContent = "UserID:  " + usersonly.userId;
        template2.querySelector('.home__title2').textContent = usersonly.title;
        template2.querySelector('.home__body2').textContent = usersonly.body;
        template2.querySelector('.home__next2').dataset.userId = usersonly.userId

        moli.appendChild(template2)
    });
}


async function PostAPI(userId) {
    const postRes = await fetch('https://jsonplaceholder.typicode.com/posts')
    const postData = await postRes.json()

    postArray = postData.filter((postArray) => postArray.userId == userId)

    Render2(postArray, elList2)
}



elList1.addEventListener('click', (evt) => {
    if (evt.target.matches('.home__next1')) {
        elList2.innerHTML = null
        userId = evt.target.dataset.userId
        PostAPI(userId)
        elList3.innerHTML = null
    }
})

// =========================== Comments ============================

function Render3(fremen, noismen) {
    noismen.innerHTML = null

    fremen.forEach((faistle) => {
        const template3 = elTemp3.cloneNode(true);

        template3.querySelector('.home__name').textContent = "postID:  " + faistle.postId;
        template3.querySelector('.home__heading3').textContent = faistle.name;
        template3.querySelector('.com__email').textContent = faistle.email;
        template3.querySelector('.com__body').textContent = faistle.body;

        noismen.appendChild(template3)
    });
}

async function commentsAPI() {
    const commentRes = await fetch('https://jsonplaceholder.typicode.com/comments')
    const commentData = await commentRes.json()

    Render3(commentData, elList3)
    commentArray = commentData.filter((comment) => comment.postId == postId)
}



elList2.addEventListener('click', (evt) => {
    if (evt.target.matches('.home__next2')) {
        const FinallyButton = evt.target.dataset.userId
        commentsAPI(FinallyButton)
    }
})




