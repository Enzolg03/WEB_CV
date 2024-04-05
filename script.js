
document.addEventListener('DOMContentLoaded', function () {
    /*Menu */
    let toggleMenu = document.querySelector('.toggle-menu');
    let menuContainer = document.querySelector('.menu-container')
    let links = document.querySelectorAll('.link');

    toggleMenu.addEventListener('change', function () {
        document.body.style.overflow = this.checked ? 'hidden' : 'auto';
        if (this.checked) {
            menuContainer.style.right = '0';
        } else {
            menuContainer.style.right = '-100%';
        }
    });
    links.forEach(link => {
        link.addEventListener('click', function () {
            toggleMenu.checked = false;
            menuContainer.style.right = '-100%';
            document.body.style.overflow = 'auto';
        });
    })
    /*Hbailidades */
    const skillsSection = document.querySelector('.skill__icon');
    const progressBars = document.querySelectorAll('.progress-bar');

    function showProgress(progressBar) {
        const value = progressBar.dataset.progress;
        progressBar.style.opacity = 1;
        progressBar.style.width = `${value}%`;

        const percent = progressBar.querySelector('.ball .per');
        let animationStarted = progressBar.dataset.animationStarted;

        if (!animationStarted || animationStarted === 'false') {
            progressBar.dataset.animationStarted = 'true';

            let p = 0;

            let my_interval = setInterval(() => {
                p++;

                if (percent) {
                    percent.innerText = p + '%';
                }

                if (p == value) {
                    clearInterval(my_interval);
                }
            }, 15);
        }
    }

    function hideProgress(progressBar) {
        const animationStarted = progressBar.dataset.animationStarted;

        if (!animationStarted || animationStarted === 'false') {
            progressBar.style.opacity = 0;
            progressBar.style.width = 0;
        } else {
            progressBar.dataset.animationStarted = 'false';
        }
    }

    window.addEventListener('scroll', () => {
        progressBars.forEach(progressBar => {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos) {
                showProgress(progressBar);
            } else {
                hideProgress(progressBar);
            }
        });
    });
    /*Escribeme un mensaje */
    const form = document.querySelector('form');
    const fullName = document.getElementById('complete-name');
    const mail = document.getElementById('mail');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    function sendEmail() {
        const bodyMessage = `Nombre Completo: ${fullName.value}<br> Email: ${mail.value} <br> Asunto: ${subject.value} <br> Mensaje: ${fullName.value}`;

        Email.send({
            SecureToken: "352a106c-6aa3-4f25-a810-47d955d2fef1",
            To: 'enzojoaquinlimaygallo@gmail.com',
            From: "enzojoaquinlimaygallo@gmail.com",
            Subject: subject.value,
            Body: bodyMessage
        }).then(
            message => {
                if (message == "OK") {
                    Swal.fire({
                        title: "Mensaje enviado",
                        text: "¡Se envío el mensaje exitosamente!",
                        icon: "success"
                    });
                }
            }
        );
    }

    function checkInputs() {
        const items = document.querySelectorAll('.item');

        for (const item of items) {
            if (item.value == "") {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }

            if (items[1].value != "") {
                checkEmail();
            }

            items[1].addEventListener("keyup", () => {
                checkEmail();
            });

            item.addEventListener("keyup", () => {
                if (item.value != "") {
                    item.classList.remove("error");
                    item.parentElement.classList.remove("error");
                }
                else {
                    item.classList.add("error");
                    item.parentElement.classList.add("error");
                }
            });
        }
    }

    function checkEmail() {
        const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

        const errorTxtEmail = document.querySelector(".error-txt.mail")

        if (!mail.value.match(emailRegex)) {
            mail.classList.add("error");
            mail.parentElement.classList.add("error");
            if (mail.value != "") {
                errorTxtEmail.innerText = "Ingresar un correo válido*";
            }
            else {
                errorTxtEmail.innerText = "Campo no válido*";
            }
        }
        else {
            mail.classList.remove("error");
            mail.parentElement.classList.remove("error");
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        checkInputs();

        if (!fullName.classList.contains("error") &&
            !mail.classList.contains("error") && !subject.classList.contains("error")
            && !message.classList.contains("error")) {
            sendEmail();

            form.reset();
            return false;
        }
    });
});






















