const contactForm = document.querySelector('form');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactNumber = document.getElementById('contactNumber');
const btnSubmitContactFrom = document.getElementById('contact-btn');


const contactInputBox1 = document.getElementById('contact-div-1');
const contactInputBox2 = document.getElementById('contact-div-2');
const contactInputBox3 = document.getElementById('contact-div-3');

// function submitContactForm() {

// }
btnSubmitContactFrom.addEventListener('click', (e) => {
        e.preventDefault();    
        checkInputs();
});
window.addEventListener('click', (e) => {
    if(contactInputBox1.classList.contains('success') && contactInputBox2.classList.contains('success') && contactInputBox3.classList.contains('success')) {
        e.preventDefault();
        setTimeout(() => {
            contactName.value = ''; 
            contactEmail.value = '';
            contactNumber.value = '';
            contactInputBox1.classList.remove('success');
            contactInputBox2.classList.remove('success');
            contactInputBox3.classList.remove('success');
        },1500) 
    }
})

function checkInputs() {
    // trim to remove the whitespaces
    const nameValue = contactName.value.trim();
    const emailValue = contactEmail.value.trim();
    const numberValue = contactNumber.value.trim();
    
    if(nameValue === '') {
        setErrorFor(contactName, 'Username cannot be blank');
    } else {
        setSuccessFor(contactName);
    }
    
    if(emailValue === '') {
        setErrorFor(contactEmail, 'Email cannot be blank');
    } else if (!isEmail(emailValue)) {
        setErrorFor(contactEmail, 'Not a valid email');
    } else {
        setSuccessFor(contactEmail);
    }
    
    if (numberValue === '') {
        setErrorFor(contactNumber, 'Number cannot be blank');
    }else{
        setSuccessFor(contactNumber)
    }
    
    function setErrorFor(input, message) {
        const inputBox = input.parentElement;
        const small = inputBox.querySelector('small');
        inputBox.className = 'inputBox error';
        small.innerText = message;
    }
    
    function setSuccessFor(input) {
        const inputBox = input.parentElement;
        const small = inputBox.querySelector('small');
        inputBox.className = 'inputBox success';
        small.innerText = "";
    }
        
    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
}