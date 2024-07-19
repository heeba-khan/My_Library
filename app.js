const completeBook=document.querySelector('#completedbooks')
const unreadBook=document.querySelector('#unreadbooks')
const allBook=document.querySelector('#allbooks')
const addBook=document.querySelector('#addnewbook')
const booksContainer=document.querySelector('.books-container')
const form=document.querySelector('.form')
const closeform=document.querySelector('#closebutton')
const title=document.querySelector('#title')
const author=document.querySelector('#author')
const pages=document.querySelector('#totalpages')
const checkbox=document.querySelector('#checkbox')
const submitbutton=document.querySelector('#submitbutton')

allBook.classList.add('buttonActive')

let myLibrary=[]

completeBook.addEventListener('click',()=>{
    booksContainer.classList.remove('unreadBook')
    booksContainer.classList.add('completeBook')

    unreadBook.classList.remove('buttonActive')
    allBook.classList.remove('buttonActive')
    completeBook.classList.add('buttonActive')
    updateDom()
})

unreadBook.addEventListener('click',()=>{
    booksContainer.classList.remove('completeBook')
    booksContainer.classList.add('unreadBook')

    unreadBook.classList.add('buttonActive')
    allBook.classList.remove('buttonActive')
    completeBook.classList.remove('buttonActive')
    updateDom()
})

allBook.addEventListener('click',()=>{
    booksContainer.classList.remove('unreadBook')
    booksContainer.classList.remove('completeBook')

    unreadBook.classList.remove('buttonActive')
    allBook.classList.add('buttonActive')
    completeBook.classList.remove('buttonActive')
    updateDom()
})

class Book{
    constructor(id,title,author,pages,haveRead){
        this.id=id
        this.title=title
        this.author=author
        this.pages=pages
        this.haveRead=haveRead
    }
}


function generateId(){
    return '_'+Math.random().toString(36).substring(2,9);
}

submitbutton.addEventListener('click',function(){
    let bookObject=getnewbook()
    myLibrary.push(bookObject)

    updateDom()
    resetform()
})

function resetform(){
    title.value=''
    author.value=''
    pages.value=''
    checkbox.checked=false
    openform.classList.remove('active')
}

function getnewbook(){
    const title=title.value
    const author=author.value
    const pages=pages.value
    const haveRead=checkbox.checked

    let bookObject=new Book(generateId(),title,author,pages,haveRead)
    return bookObject
}

closeform.addEventListener('click',()=>{
    form.classList.remove('active')
})

addBook.addEventListener('click',()=>{
    form.classList.add('active')
})

function updateDom(){
    booksContainer.innerHTML=''

    if(booksContainer.classList.contains('completeBook')){
        let completeBooks=myLibrary.filter(book=>book.haveRead===true)
        completeBooks.forEach((bookObject)=>{
            createBook(bookObject)
        })
    }
    else if(booksContainer.classList.contains('unreadBook')){
        let unreadBooks=myLibrary.filter(book=>book.haveRead===false)
        unreadBooks.forEach((bookObject)=>{
            createBook(bookObject)
        })
    }
    else{
       myLibrary.forEach((bookObject)=>{
        createBook(bookObject)
       })
    }
}


function createBook(){
    let bookDiv=document.createElement('div')
    bookDiv.classList.add('book')
    bookDiv.setAttribute('data-id',bookObject.id)

    // title div
    let titleDiv=document.createElement('div')
    let titlePara=document.createElement('p')
    titlePara.textContent='Book Title'
    let titleHeading=document.createElement('h2')
    titleHeading.textContent=bookObject.title

    titlePara.classList.add('sub-heading')
    titleHeading.classList.add('heading')
    titleDiv.appendChild(titlePara)
    titleDiv.appendChild(titleHeading)


    // author div
    let authorDiv=document.createElement('div')
    let authorPara=document.createElement('p')
    authorPara.textContent='Book Author'
    let authorHeading=document.createElement('h2')
    authorHeading.textContent=bookObject.author

    authorPara.classList.add('sub-heading')
    authorHeading.classList.add('heading')
    authorDiv.appendChild(authorPara)
    authorDiv.appendChild(authorHeading)

    // pages div
    let pageDiv=document.createElement('div')
    let pagePara=document.createElement('p')
    pagePara.textContent='No. of Pages'
    let pageHeading=document.createElement('h2')
    pageHeading.textContent=bookObject.pages

    pagePara.classList.add('sub-heading')
    pageHeading.classList.add('heading')
    pageDiv.appendChild(pagePara)
    pageDiv.appendChild(pageHeading)

    // status div
    let statusDiv=document.createElement('div')
    let statusPara=document.createElement('p')
    statusPara.textContent='Status'
    let statusButton=document.createElement('button')
    statusPara.classList.add('sub-heading')
    statusButton.classList.add('status')
    statusButton.classList.add('changeStatus')
    statusButton.textContent=bookObject.haveRead?'Read':'Unread'
    if(bookObject.haveRead===true){
        statusButton.classList.add('read')
    }
    else{
        statusButton.classList.add('unread')
    }
    statusDiv.appendChild(statusPara)
    statusDiv.appendChild(statusButton)

    // remove book button
    let removeBook=document.createElement('button')
    removeBook.classList.add('removebook')
    removeBook.textContent='Remove Book'

    bookDiv.appendChild(titleDiv)
    bookDiv.appendChild(authorDiv)
    bookDiv.appendChild(statusDiv)
    bookDiv.appendChild(pageDiv)
    bookDiv.appendChild(removeBook)


    booksContainer.appendChild(bookDiv)
}

booksContainer.addEventListener('click',function(event){

    if(event.target.classList.contains('removeBook')){
        let choice=confirm('Are you sure you want to remove this book?')

        if(choice)
        {
            let parent=event.target.closest('.book')
            let id=parent.getAttribute('data-id')
            const index=myLibrary.findIndex(book=>book.id===id)

            if(index!==-1)
            {
                myLibrary.splice(index,1);
            }
            updateDom();
        }
    }
    if(event.target.classList.contains('changeStatus')){
        let parent=event.target.classList.closest('.book')
        let id=parent.getAttribute('data-id')
        let book=myLibrary.find(book=>book.id===id)
        book.haveRead=!book.haveRead

        updateDom()
    }
})

