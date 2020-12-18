"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);
        formData.append('image', formImage.files[0]);

        if(error === 0){
            form.classList.add('_sending');
            /*
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = '';
                form.reset();
            }else{
                alert('404 :)')
            }
            */
        }else{
            alert('Fill in the required fields')
        }
    }


    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }
    function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
    //check email function - does the email meet the requirements
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    //get input file in preview
    const formImage = document.getElementById('formImage');
	const formPreview = document.getElementById('formPreview');
    
    
    formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});

    function uploadFile(file) {
		// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('You can add only images');
			formImage.value = '';
			return;
		}
        if (file.size > 2 * 1024 * 10204) {
            alert('File size must be mess than 2 MB');
            return;
        }

        var reader = new FileReader();
		reader.onload = function (e) {
            formPreview.innerHTML = `<img src="${e.target.result}" alt="Uploaded photo">`;
        };
        reader.onerror =  function (e) {
            alert('404 :)')
        };
        reader.readAsDataURL(file);
    }
});