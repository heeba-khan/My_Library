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

function addBook(){
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