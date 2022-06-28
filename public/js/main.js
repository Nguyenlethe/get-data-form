const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const from = $('.from')
const input = $$('.input')
const inputEmail = $('.input[name="email"]')
const inputPhone = $('.input[name="phone"]')
const inputRadio = $$('.input-radio')
const inputSelect = $('.input-select')
const error = $$('.error')
const errorSelect = $('.error[name="select"]')
const errorradio = $('.error[name="radio"]')
const inputCheckBox = $$('.input-checkbox')
const inputChange  = $$('.test') 
const htmls = $('.root')
const Myform = $('.my')
const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regNumber = /^(0[234][0-9]{8}|1[89]00[0-9]{4})$/;
let MyCv = {interests: []}


from.onsubmit = (e) => {
    e.preventDefault()
    var checkRadio = 0  
    var NumberNext = 0  
    input.forEach((element, index) => {
        const eror = error[index]
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
            errorradio.innerHTML = 'Vui lòng chọn giới tính !'
        }
        if(element.checked){
            checkRadio += 1
            errorradio.innerHTML = ''
            MyCv.gender = element.value
        }
    })
    if(checkRadio == 1 && NumberNext == 4){
        inputCheckBox.forEach((element,index)=> {
            if(element.checked){
                MyCv.interests.push(inputCheckBox[index].value)
            }
        })
        this.AddNewMyHtml(MyCv)
        htmls.classList.add('active')
    }
}

function AddNewMyHtml(MyCv) {
    Myform.innerHTML = `<div class="img" style="background-image: url(https://cdn.24h.com.vn/upload/1-2022/images/2022-03-13/anh-1-1647162766-197-width650height741.jpg);"></div>
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