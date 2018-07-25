/* Exemplo de Formulário com bootstrap e javascript
*
* Formulário para demonstrar o uso de api viacep com a biblioteca XMLHttpRequest e dom level 2
*
* Autor: Andre Luis
* email:andre.luis.pessoa@gmail.com
*/
(function () {
  var button = document.querySelector('#busca-cep');
  var buttonsave = document.querySelector('#salvar');
  var pessoa = {};
  form_init();

  //function form_init limpa os campos, desativa eles
  function form_init() {
    const $input = document.querySelectorAll('input');
    Array.prototype.forEach.call($input, input => input.value = '');
    disable_input(true);
  }


  // desativar campos de endereço com Dom level 0
  function disable_input(desativa) {
    'use strict'
    var $inputsd = document.querySelectorAll('.disable_input input,#salvar');
    Array.prototype.forEach.call($inputsd, inputd => inputd.disabled = desativa);
  }

  function validaCep(request) {
    var $msg = document.querySelector('#erro_msg_cep');

    if (request.readyState == XMLHttpRequest.DONE && request.responseText) {
      if (request.status === 404) {
        $msg.innerHTML = "Cep inválido!!!";
        disable_input(true);
      }
    }
  }

  //busca cep na api e retorna
  button.addEventListener('click', () => {

    //recebe do formulario o valor do campo cep
    var cep = document.querySelector('#cep').value;


    const api = `https://viacep.com.br/ws/${cep}/json/`;

    //objeto request recebe a API
    var request = new XMLHttpRequest();



    //objeto request dados da API passando GET e URL
    request.open('GET', api);

    request.onload = function() {
      'use strict'

      validaCep(request);
      //converte o texto para JSON e atribui a variavel resposta
      //variavel resposta está no escopo da função
      var resposta = JSON.parse(request.responseText);

      //retorna para o form
      document.querySelector('#endereco').value = resposta.logradouro;
      document.querySelector('#bairro').value = resposta.bairro;
      document.querySelector('#cidade').value = resposta.localidade;
      disable_input(false);
    }

    request.send();

  })
  // recebe dados do formulario
  buttonsave.addEventListener('click', function() {
    pessoa.endereco = {logradouro : "", complemento:"", bairro : "", cidade:""}
      //atribui os dados no objeto pessoa
      pessoa.nome = document.querySelector('#nome').value;
      pessoa.idade = document.querySelector('#idade').value;
      pessoa.endereco.logradouro = document.querySelector('#endereco').value;
      pessoa.endereco.complemento = document.querySelector('#complemento').value;
      pessoa.endereco.bairro = document.querySelector('#bairro').value;
      pessoa.endereco.cidade = document.querySelector('#cidade').value;
      form_init();


  })
})()
