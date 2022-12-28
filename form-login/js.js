//func chamada init que vai ser chamada quando a tela carregar
const init = () => {

    // Pura validação de email e senha, se n passa add um classse de erro pro css 
    const emailValidate = (event) => {
        //Regex é uma forma de verificar emails e afins, salvar essa linha
        const input = event.currentTarget;
        const regex =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTest = regex.test(input.value);

        if(!emailTest){
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        }else{
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }
    }

    const passwordValidate = (event) => {
        const input = event.currentTarget;

        if(input.value.length < 8){
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        }else{
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }
        
    }

    // Captura os 2 inputs mais o submit, .value pra pegar o valor deles
    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]')
    const submitButton = document.querySelector('.submit_form')

    //Usa as funções criadas em cada input pra faazer a validação
    inputEmail.addEventListener('input', emailValidate);
    inputPassword.addEventListener('input', passwordValidate);

    //cria classe pra estilizar no css, seja ela de sucesso ou erro quando tiver passsando
    //dados no input
    const errorButton = () => {
        submitButton.classList.remove('sucess');
        submitButton.classList.add('error');
        submitButton.textContent="Erro :("
    }

    const sucessButton = ()=> {
        submitButton.classList.remove('error');
        submitButton.classList.add('sucess')
        submitButton.textContent="Sent :)"
    }

    //Quando clicar no submit puxa essa sequencia
    if(submitButton){
        submitButton.addEventListener('click', (event) =>{
            event.preventDefault(); // evita erros

            submitButton.textContent="...Loading"
            //Reqres é uma API aqui a usamos pra simular um login bem sucedido
            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) =>{ //captura a resposta do formulario e passa o botão certo pra situação
                if (response.status !== 200){
                    return errorButton();
                }
                sucessButton();
            }).catch(() => {
                errorButton();
            })
        })
    }
}

window.onload = init;