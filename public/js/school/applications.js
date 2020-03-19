let selectedStudents = [];

const selectStudent = (button, id) => {
  if (button.classList.contains('selected-button')) {
    button.classList.remove('selected-button');
    button.parentNode.classList.remove('selected-student')
    selectedStudents = selectedStudents.filter(student => student != id);
    button.childNodes[0].style.display = 'none';
    document.querySelector('.selected-number').innerHTML = `${selectedStudents.length} seçildi`;
    if (selectedStudents.length == 0) {
      document.querySelector('.applications-header-buttons-wrapper').style.visibility = 'hidden';
      document.querySelector('.applications-header-select-button.selected-button').childNodes[0].style.display = 'none';
      document.querySelector('.applications-header-select-button.selected-button').classList.remove('selected-button');
      const buttonWrappers = document.querySelectorAll('.buttons-wrapper');
      buttonWrappers.forEach(wrapper => {
        wrapper.style.visibility = 'initial';
      });
    }
  } else {
    button.classList.add('selected-button');
    button.parentNode.classList.add('selected-student')
    selectedStudents.push(id);
    button.childNodes[0].style.display = 'block';
    document.querySelector('.applications-header-buttons-wrapper').style.visibility = 'initial';
    document.querySelector('.selected-number').innerHTML = `${selectedStudents.length} seçildi`;
    document.querySelector('.applications-header-select-button').childNodes[0].style.display = 'block';
    document.querySelector('.applications-header-select-button').classList.add('selected-button');
    const buttonWrappers = document.querySelectorAll('.buttons-wrapper');
    buttonWrappers.forEach(wrapper => {
      wrapper.style.visibility = 'hidden';
    });
  }
}

const selectAll = (button) => {
  if (button.classList.contains('selected-button')) {
    const selectedStudentsDOM = document.querySelectorAll('.each-student-wrapper.selected-student');

    selectedStudentsDOM.forEach(student => {
      selectStudent(student.childNodes[0], student.id);
    });
    selectedStudents = [];

    button.classList.remove('selected-button');
    button.childNodes[0].style.display = 'none';
    document.querySelector('.applications-header-buttons-wrapper').style.visibility = 'hidden';
    const buttonWrappers = document.querySelectorAll('.buttons-wrapper');
      buttonWrappers.forEach(wrapper => {
        wrapper.style.visibility = 'initial';
      });
  } else {
    const students = document.querySelectorAll('.each-student-wrapper');

    students.forEach(student => {
      selectStudent(student.childNodes[0], student.id);
    });

    button.classList.add('selected-button');
    document.querySelector('.applications-header-buttons-wrapper').style.visibility = 'initial';
    document.querySelector('.selected-number').innerHTML = `${selectedStudents.length} seçildi`;
    const buttonWrappers = document.querySelectorAll('.buttons-wrapper');
    buttonWrappers.forEach(wrapper => {
      wrapper.style.visibility = 'hidden';
    });
  }
}

const sendStudents = (response) => {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/school/applications");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
    "students": selectedStudents,
    response
  }));

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4)
      return location.reload();
  }
}

window.onload = () => {
  document.addEventListener('click', event => {
    if (event.target.classList.contains('select-student-button'))
      selectStudent(event.target, event.target.parentNode.id);
    else if (event.target.parentNode.classList.contains('select-student-button'))
      selectStudent(event.target.parentNode, event.target.parentNode.parentNode.id);
    else if (event.target.classList.contains('applications-header-select-button'))
      selectAll(event.target);
    else if (event.target.parentNode.classList.contains('applications-header-select-button'))
      selectAll(event.target.parentNode);

    if (event.target.classList.contains('accept-button')) {
      if (event.target.classList.contains('accept-button-all')) {
        if (confirm("Seçili öğrencileri kabul etmek istediğinize emin misiniz?"))
          sendStudents('accept');
      } else {
        if (confirm("Bu öğrenciyi kabul etmek istediğinize emin misiniz?")) {
          selectedStudents.push(event.target.parentNode.parentNode.id)
          sendStudents('accept');
        }
      }
    } else if (event.target.parentNode.classList.contains('accept-button')) {
      if (event.target.parentNode.classList.contains('accept-button-all')) {
        if (confirm("Seçili öğrencileri kabul etmek istediğinize emin misiniz?"))
          sendStudents('accept');
      } else {
        if (confirm("Bu öğrenciyi kabul etmek istediğinize emin misiniz?")) {
          selectedStudents.push(event.target.parentNode.parentNode.parentNode.id)
          sendStudents('accept');
        }
      }
    } else if (event.target.classList.contains('reject-button')) {
      if (event.target.classList.contains('reject-button-all')) {
        if (confirm("Seçili öğrencileri reddetmek istediğinize emin misiniz?"))
          sendStudents('reject');
      } else {
        if (confirm("Bu öğrenciyi reddetmek istediğinize emin misiniz?")) {
          selectedStudents.push(event.target.parentNode.parentNode.id)
          sendStudents('reject');
        }
      }
    } else if (event.target.parentNode.classList.contains('reject-button')) {
      if (event.target.parentNode.classList.contains('reject-button-all')) {
        if (confirm("Seçili öğrencileri reddetmek istediğinize emin misiniz?"))
          sendStudents('reject');
      } else {
        if (confirm("Bu öğrenciyi reddetmek istediğinize emin misiniz?")) {
          selectedStudents.push(event.target.parentNode.parentNode.parentNode.id)
          sendStudents('reject');
        }
      }
    }
  });
}
