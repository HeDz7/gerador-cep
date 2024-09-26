const cep = document.querySelector('#cep')
const address = document.querySelector('#address')
const bairro = document.querySelector('#bairro')
const cidade = document.querySelector('#cidade')
const msg = document.querySelector('#msg')

cep.addEventListener('focusout', async () => {
    try {
        const onlyNumbers = /^[0-9]+$/

        if(!onlyNumbers.test(cep.value)) {
            throw {cep_error: 'CEP inválido'}
        }

        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`)

        if(!response.ok) {
            throw await response.json()
        }

        const responseCep = await response.json()

        address.value = responseCep.logradouro
        bairro.value = responseCep.bairro
        cidade.value = responseCep.localidade

    } catch (error) {
        if(error?.cep_error) {
            msg.textContent = error.cep_error

            setTimeout(() => {
                msg.textContent = ''
            }, 5000);
        }
        console.log('Erro:' + error);
        
    }
})