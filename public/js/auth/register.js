window.onload = () => {
  const schoolList = [
    "Albert-Ludwigs-Universität Freiburg",
    "Bard College Berlin, A Liberal Arts University",
    "Bauhaus-Universität Weimar",
    "Bergische Universität Wuppertal"
  ]

  const schoolInput = document.getElementById('school-input');
  const schoolValueWrapper = document.querySelector('.school-input-values');

  document.addEventListener('click', (event) => {
    if (event.target.className == 'input-value-each-span') {
      schoolInput.value = event.target.innerHTML;
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
        if (school.toLowerCase().indexOf(schoolInput.value.toLowerCase()) !== -1) {
          const newSpan = document.createElement('span');
          newSpan.classList.add('input-value-each-span');
          newSpan.innerHTML = school;
          schoolValueWrapper.appendChild(newSpan);
        }
      });
      responsiveDesign(schoolValueWrapper);
    } else {
      schoolValueWrapper.innerHTML = "";
      schoolList.forEach(school => {
        const newSpan = document.createElement('span');
        newSpan.classList.add('input-value-each-span');
        newSpan.innerHTML = school;
        schoolValueWrapper.appendChild(newSpan);
      });
      responsiveDesign(schoolValueWrapper);
    };
  };

  const form = document.querySelector('.form-wrapper');
  const error = document.querySelector('.each-error-line');
  form.onsubmit = (event) => {
    event.preventDefault();
    
    if (schoolList.indexOf(schoolInput.value) === -1) {
      error.innerHTML = 'Bitte wähle eine Hochschule!';
    }
    else if (document.getElementById('password-input-one').value.length < 6 || document.getElementById('password-input-two').value.length < 6) {
      error.innerHTML = 'Dein Passwort muss mindestens 6-stellig sein!';
    }
    else if (document.getElementById('password-input-one').value != document.getElementById('password-input-two').value) {
      error.innerHTML = 'Bitte bestätige dein Passwort!';
    }
    else {
      form.submit();
    }
  }
}
