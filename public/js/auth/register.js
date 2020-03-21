window.onload = () => {
  const schoolList = JSON.parse(document.getElementById('school-object').innerHTML);
  const schoolNameList = [];

  schoolList.forEach(school => {
    schoolNameList.push(school.name);
  });

  const formWrapper = document.querySelector('.all-content-register-wrapper');
  const emailInput = document.getElementById('email-input');
  const nameInput = document.getElementById('name-input');
  const numberInput = document.getElementById('number-input');
  const passwordInput = document.getElementById('password-input');
  const passwordInputTwo = document.getElementById('password-input-two');
  const schoolInput = document.getElementById('school-input');
  const schoolInputId = document.getElementById('school-input-id');
  const schoolValueWrapper = document.querySelector('.school-input-values');
  const errorText = document.querySelector('.error-text');

  document.addEventListener('click', (event) => {
    if (event.target.className == 'input-value-each-span') {
      schoolInput.value = event.target.innerHTML;
      schoolInputId.value = event.target.id;
    }

    if (event.target.id == 'school-input') {
      schoolValueWrapper.style.display = 'flex';
    } else {
      schoolValueWrapper.style.display = 'none';
    }
  });

  schoolInput.onfocus = (event) => {
    schoolValueWrapper.style.display = 'flex';
  };

  schoolInput.oninput = (event) => {
    if (schoolInput.value) {
      schoolValueWrapper.innerHTML = "";
      schoolList.forEach(school => {
        if (school.name.toLowerCase().indexOf(schoolInput.value.toLowerCase()) !== -1) {
          const newSpan = document.createElement('span');
          newSpan.classList.add('input-value-each-span');
          newSpan.innerHTML = school.name;
          schoolValueWrapper.appendChild(newSpan);
        }
      });

      const anyA = document.createElement('a');
      anyA.innerHTML = "Okulunu bulamadın mı?";
      anyA.href = "/auth/school/register";
      schoolValueWrapper.appendChild(anyA);

    } else {
      schoolValueWrapper.innerHTML = "";
      schoolList.forEach(school => {
        const newSpan = document.createElement('span');
        newSpan.classList.add('input-value-each-span');
        newSpan.innerHTML = school.name;
        schoolValueWrapper.appendChild(newSpan);
      });
      const anyA = document.createElement('a');
      anyA.innerHTML = "Okulunu bulamadın mı?";
      anyA.href = "/auth/school/register";
      schoolValueWrapper.appendChild(anyA);
    };
  };

  formWrapper.onsubmit = event => {
    event.preventDefault();

    if (!emailInput.value || !nameInput.value || !schoolInput.value || !numberInput.value || !passwordInput.value || !passwordInputTwo.value) {
      errorText.classList.remove('error-line-animation-class');
      setTimeout(() => {
        errorText.innerHTML = "Lütfen bütün alanları doldurun.";
        errorText.style.visibility = "initial";
        errorText.classList.add('error-line-animation-class');
      }, 100);
    } else if (passwordInput.value != passwordInputTwo.value) {
      errorText.classList.remove('error-line-animation-class');
      setTimeout(() => {
        errorText.innerHTML = "Lütfen şifrenizi tekrar edin.";
        errorText.style.visibility = "initial";
        errorText.classList.add('error-line-animation-class');
      }, 100);
    } else if (!schoolNameList.includes(schoolInput.value) || !schoolInputId.value) {
      errorText.classList.remove('error-line-animation-class');
      setTimeout(() => {
        errorText.innerHTML = "Lütfen listeden bir okul seçin.";
        errorText.style.visibility = "initial";
        errorText.classList.add('error-line-animation-class');
      }, 100);
    } else if (passwordInput.value.length < 6) {
      errorText.classList.remove('error-line-animation-class');
      setTimeout(() => {
        errorText.innerHTML = "Şifreniz en az 6 karakterli olmalı.";
        errorText.style.visibility = "initial";
        errorText.classList.add('error-line-animation-class');
      }, 100);
    } else {
      formWrapper.submit();
    }
  }
}
