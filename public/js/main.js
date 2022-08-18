const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const body = $('body')    
const Myform = $('.my')
const from = $('.from')
const htmls = $('.root')
const error = $$('.error')
const input = $$('.input')
const inputChange  = $$('.test') 
const wraperFile = $('.load-avata')
const btnShowForm = $('.custom-btn')
const inputRadio = $$('.input-radio')
const inputSelect = $('.input-select')
const inputFile = $('input[name="file"]')
const inputCheckBox = $$('.input-checkbox')
const inputEmail = $('.input[name="email"]')
const inputPhone = $('.input[name="phone"]')
const errorRadio = $('.error[name="radio"]')
const errorSelect = $('.error[name="select"]')
const errorFile = $('span[name="file"]')
const placeholderInputFile = $('.load-avata-placeholder')
const regNumber = /^(0[234][0-9]{8}|1[89]00[0-9]{4})$/;
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let MyCv = {interests: []}

body.oncontextmenu = (e) => {
    e.preventDefault()
}
body.onselectstart = (e) =>{
    e.preventDefault()
}
from.onsubmit = (e) => {
    e.preventDefault()
    var checkRadio = 0  
    var NumberNext = 0  
    input.forEach((element, index) => {
        const eror = error[index]
        console.log(element.value)
        if(element.value.trim() == ''){
            eror.innerHTML = 'Không được để trống trường này !'
        }else {
            if(element.name=="name"){
                eror.innerHTML = ''
                NumberNext += 1;
                MyCv.name = element.value
            }
            if(element.name=="email"){
                if(regex.test(inputEmail.value) == false && inputEmail.value.trim() !== ''){
                    eror.innerHTML = 'Trường này phải là email !'
                }
                if(regex.test(inputEmail.value) == true){
                    NumberNext += 1;
                    eror.innerHTML = ''
                    MyCv.email = inputEmail.value
                }
            }
            if(element.name=="phone"){
                if(regNumber.test(inputEmail.value) == false && inputPhone.value.trim() !== ''){
                    eror.innerHTML = 'Trường này phải là số điện thoại !'
                }
                if(regNumber.test(inputPhone.value) == true){
                    NumberNext += 1;
                    eror.innerHTML = ''
                    MyCv.phone = inputPhone.value
                }
            }
        } 
    })
    if(inputSelect.value == 'null'){
        errorSelect.innerHTML = 'Vui lòng chọn tỉnh thành phố !'
    }else {
        errorSelect.innerHTML = ''
        NumberNext += 1
        MyCv.address = inputSelect.value
    }
    inputRadio.forEach((element, index) => {
        if(checkRadio == 0){
            errorRadio.innerHTML = 'Vui lòng chọn giới tính !'
        }
        if(element.checked){
            checkRadio += 1
            errorRadio.innerHTML = ''
            MyCv.gender = element.value
        }
    })
    if(placeholderInputFile.innerHTML == 'Chọn file'){
        errorFile.innerHTML = 'Vui lòng chọn 1 hình ảnh !'
    }else{
        errorFile.innerHTML = ''
        NumberNext += 1
    }
    if(checkRadio == 1 && NumberNext == 5){
        inputCheckBox.forEach((element,index)=> {
            if(element.checked){
                MyCv.interests.push(inputCheckBox[index].value)
            }
        })
        this.AddNewMyHtml(MyCv)
        htmls.classList.add('active')
    }
}
inputFile.onchange = (e) => {
    const file =  e.target.files[0]
    file.src = URL.createObjectURL(file) 
    MyCv.avata = file.src
    placeholderInputFile.innerHTML = e.target.files[0].name
    errorFile.innerHTML = ''
}
function AddNewMyHtml(MyCv) {
    console.log(MyCv)
    Myform.innerHTML = `<div class="img" style="background-image: url(${MyCv.avata});"></div>
    <div class="information"><p>Họ và tên :</p><h3>${MyCv.name}</h3></div>
    <div class="information"><p>Email :</p><h3>${MyCv.email}</h3></div>
    <div class="information"><p>Số Điện Thoại :</p><h3>${MyCv.phone}</h3></div>
    <div class="information"><p>Địa Chỉ :</p><h3>${MyCv.address}</h3></div>
    <div class="information"><p>Giới Tính :</p><h3>${MyCv.gender}</h3></div>
    <div class="information end"><p>Sở Thích : </p><h3>${MyCv.interests ? MyCv.interests : 'Không có sở thích'}</h3></div>`
}
inputChange.forEach((element, index)=> {
    const err = error[index]
    element.oninput = () => {
       err.innerHTML = ''
    }
})
wraperFile.onclick = () => {
    errorFile.innerHTML = ''
    inputFile.click()
}
inputRadio.forEach((element, index)=> {
    element.onclick = () => {
        errorRadio.innerHTML = ''
    }
})
btnShowForm.onclick = () => {
    from.style.transform = 'translateY(0)'
    btnShowForm.style.display = 'none'
}
