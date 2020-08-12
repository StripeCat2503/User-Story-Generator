const role = document.getElementById('role')
const todo = document.getElementById('todo')
const reason = document.getElementById('reason')
const usList = document.getElementById('usList')
const createBtn = document.getElementById('createBtn')
const clearBtn = document.getElementById('clearBtn')

var userStories = []
var arr = ['u', 'e', 'o', 'a', 'i']
var initID = 0
var previewEl

createBtn.addEventListener('click', (e) => {
    addUs()
    updateUsList()
})

clearBtn.addEventListener('click', () =>{
    if(userStories.length == 0) return

    let result = window.confirm('Are you sure you want to clear all user stories?')
    if(result){
        userStories = []
        updateUsList()
    }
})

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

        // Create user story item
        let item = document.createElement('li')
        item.innerText = us.content
        let userIcon = document.createElement('span')
        userIcon.className = 'user-icon'
        userIcon.innerHTML = '<i class="far fa-smile"></i>'
        item.prepend(userIcon)

        // create button to remove a user story
        let removeBtn = document.createElement('button')
        removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
        removeBtn.id = us.id
        removeBtn.className = 'btn-remove'
        removeBtn.addEventListener('click', (e) => {
            userStories.forEach(u => {
                if (u.id == removeBtn.id) {
                    userStories = userStories.filter(us => us.id != removeBtn.id)
                    updateUsList()
                    $('.remove-toast').toast('show')
                }
            })
        })

        // create button to copy a user story
        let copyBtn = document.createElement('button')
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>'
        copyBtn.id = us.id
        copyBtn.className = 'btn-copy'
        copyBtn.addEventListener('click', (e) => {
            userStories.forEach(u => {
                if (u.id == copyBtn.id) {
                    navigator.clipboard.writeText(u.content)
                    .then(() => {
                        $('.copy-toast').toast('show')
                    }, () => alert('Failed!'))                 
                }
            })
        })

        item.appendChild(copyBtn)
        item.appendChild(removeBtn)
        
        usList.appendChild(item)
    })

    previewEl = document.createElement('li')
    previewEl.className = 'preview'
    previewEl.innerText = `As ..., I want to ..., so that ...`

    usList.appendChild(previewEl)
}

role.addEventListener('keyup', (e) => {
    let a = arr.includes(role.value[0].toLowerCase()) ? 'an' : 'a'
    let role_val = role.value ? role.value : '...'
    let todo_val = todo.value ? todo.value : '...'
    let reason_val = reason.value ? reason.value : '...'
    previewEl.innerText = `As ${a} ${role_val}, I want to ${todo_val}, so that ${reason_val}`

    if (e.key === 'Enter') {
        addUs()
        updateUsList()
    }
})

todo.addEventListener('keyup', (e) => {
    let a = arr.includes(role.value[0].toLowerCase()) ? 'an' : 'a'
    let role_val = role.value ? role.value : '...'
    let todo_val = todo.value ? todo.value : '...'
    let reason_val = reason.value ? reason.value : '...'
    previewEl.innerText = `As ${a} ${role_val}, I want to ${todo_val}, so that ${reason_val}`

    if (e.key == 'Enter') {
        addUs()
        updateUsList()
    }
})

reason.addEventListener('keyup', (e) => {
    let a = arr.includes(role.value[0].toLowerCase()) ? 'an' : 'a'
    let role_val = role.value ? role.value : '...'
    let todo_val = todo.value ? todo.value : '...'
    let reason_val = reason.value ? reason.value : '...'
    previewEl.innerText = `As ${a} ${role_val}, I want to ${todo_val}, so that ${reason_val}`

    if (e.key == 'Enter') {
        addUs()
        updateUsList()
    }
})

updateUsList()
role.focus()
