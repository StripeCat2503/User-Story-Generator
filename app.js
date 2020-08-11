const role = document.getElementById('role')
const todo = document.getElementById('todo')
const reason = document.getElementById('reason')
const usList = document.getElementById('usList')
const createBtn = document.getElementById('createBtn')

var userStories = []
var arr = ['u', 'e', 'o', 'a', 'i']
var initID = 0
var previewEl

createBtn.addEventListener('click', (e) => {
    addUs()
    updateUsList()
})

updateUsList()

function addUs() {
    if (role.value && todo.value && reason.value) {
        let aOrAn = arr.includes(role.value[0]) ? 'an' : 'a'
        let us = `As ${aOrAn} ${role.value}, I want to ${todo.value}, so that ${reason.value}`
        let usObj = new UserStory(initID, us)

        userStories.push(usObj)
        initID += 1

        role.value = ''
        todo.value = ''
        reason.value = ''
    }
    else {
        alert('Empty field is not allowed')
    }
}

function updateUsList() {
    usList.innerHTML = ''

    userStories.forEach(us => {

        let item = document.createElement('li')
        item.innerText = us.content
        usList.appendChild(item)
        let removeBtn = document.createElement('button')
        removeBtn.innerText = 'Remove us'
        removeBtn.id = us.id
        removeBtn.className = 'btn-remove'
        removeBtn.addEventListener('click', (e) => {
            userStories.forEach(u => {
                if (u.id == removeBtn.id) {
                    userStories = userStories.filter(us => us.id != removeBtn.id)
                    updateUsList()
                }
            })
        })

        let copyBtn = document.createElement('button')
        copyBtn.innerText = 'Copy'
        copyBtn.id = us.id
        copyBtn.className = 'btn-copy'
        copyBtn.addEventListener('click', (e) => {
            userStories.forEach(u => {
                if (u.id == copyBtn.id) {
                    navigator.clipboard.writeText(u.content)
                    .then(() => alert('User Story Copied!'), () => alert('Failed!'))                 
                }
            })
        })

        usList.appendChild(removeBtn)
        usList.appendChild(copyBtn)
    })

    previewEl = document.createElement('li')
    previewEl.className = 'preview'
    previewEl.innerText = `As ..., I want to ..., so that ...`

    usList.appendChild(previewEl)
}

role.addEventListener('keyup', (e) => {
    let a = arr.includes(role.value) ? 'an' : 'a'
    let role_val = role.value ? role.value : '...'
    let todo_val = todo.value ? todo.value : '...'
    let reason_val = reason.value ? reason.value : '...'
    previewEl.innerText = `As ${role_val}, I want to ${todo_val}, so that ${reason_val}`

    if (e.key === 'Enter') {
        addUs()
        updateUsList()
    }
})

todo.addEventListener('keyup', (e) => {
    let role_val = role.value ? role.value : '...'
    let todo_val = todo.value ? todo.value : '...'
    let reason_val = reason.value ? reason.value : '...'
    previewEl.innerText = `As ${role_val}, I want to ${todo_val}, so that ${reason_val}`

    if (e.key == 'Enter') {
        addUs()
        updateUsList()
    }
})

reason.addEventListener('keyup', (e) => {
    let role_val = role.value ? role.value : '...'
    let todo_val = todo.value ? todo.value : '...'
    let reason_val = reason.value ? reason.value : '...'
    previewEl.innerText = `As ${role_val}, I want to ${todo_val}, so that ${reason_val}`

    if (e.key == 'Enter') {
        addUs()
        updateUsList()
    }
})
