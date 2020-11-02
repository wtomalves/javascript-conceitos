var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');


/*vamos criar um array para armazenamento das tags do html em javaScript*/


/*Aqui vamos trasngormar o nosso JSON em array. Se não tiver nada dentro do array vai dar erro. Para isso não acontecer acrescentaremos || e uma array []. Isso signidica que se não conseguir retornar o valor aceitável do JSON.parse, ele vai jogar um valor vázio lá pra dentro da nossa váriavel todos*/
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];


/*Vamos fazer uma função para renderizar os todos em tela do navegador, vamos percorrer o array e mostrar eles em tela*/

function renderTodos() {

  listElement.innerHTML = ''; //tudo que estiver dentro da ul a gente vai colocar como vazio

  /*vamos usar um for específico para arrays */
  for (todo of todos) {
    /*vamos começar criar os elementos*/
    var todoElement = document.createElement('li');
    var todoText = document.createTextNode(todo);

    //criar link dos elementos
    var linkElement = document.createElement('a');

    //vaamos colocar um href no link para ficar clicável

    linkElement.setAttribute('href', '#');
    //vamos colocar um texto dentro desse link "a"


    /*Como o todo aqui dentro é um texto, eu posso pesquisar dentro do meu array todos, qual que é a posição que tem o texto, então o javaScript nos dá um método chamado indexOf que passando um texto, ou valor de cada ítem do nosso array todos, ele retorna em qual posição o array está */
    var pos = todos.indexOf(todo); //esse todo é o valor que estou recendo do for

    /*Agora faremos a exclusão mediante o onclick e a posição*/
    linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')')



    var linkText = document.createTextNode('Excluir');

    linkElement.appendChild(linkText);


    todoElement.appendChild(todoText);
    todoElement.appendChild(linkElement);
    listElement.appendChild(todoElement);

  }
}

renderTodos();

function addTodo() {
  /*criamos uma variável para receber o valor do imput*/
  var todoText = inputElement.value;

  /*adcionar o todoText no meu array */

  todos.push(todoText);
  /*vamos apagar o compo de digitação input */

  inputElement.value = '';

  /*Agora vamos chamar a função novamente para que ela ´possa renderizar a lista de todos novamente */
  renderTodos();
  saveToStorage()
}

buttonElement.onclick = addTodo;

//função para remover todo

function deleteTodo(pos) {
  /*remover todo pela posicição, vamos ultilizar o splice que remove uma quantidade de itens do array, baseado na posição que a gente passar*/
  todos.splice(pos, 1); //falamos a posição e pedimos a remoção de 1 ítem

  //vamos chamar a função renderTodos para que renderize a lista com os novos ítens
  renderTodos();
  saveToStorage()
}


//vamos criar uma função que vai salvar as informações dos todos digitados, para que quando dêmos um salve na página não percamos toda informação até ali inserida

function saveToStorage() {
  /*essa função vai pegar a nossa lista de todos e vai salvar no storage. o Storege podemos acessar através da variável localStorage que é global. Aqui ele vai dar uma função  chamada setITem, ele vai setar um valor no storage. passamos o valor que ele vai setar vamos chamar de 'lista_todos' (poderiamos dar o nosso que a gente quisesse). E passaremos mais um valor que é a lista de todos. Porém o nosso localStorage não tem habilidade para gravar vetores nem objetos dentro dele. Ele simplesmente uma chave valor que só grava uma chave e um valor no formato string.



  localStorage.setItem('list_todos', todos);



   Então precisaremos converter nosso array de todos em alguma estrutura  que permita a gente gravar um vetor. E essa estrutura que permite que a gente vai ultilizar é chamada JSON:

   vamos converter o todos dessa forma*/

  localStorage.setItem('list_todos', JSON.stringify(todos));

  //agora podemos chamar está função dentro das nossas outras duas funções de addTodo e de deleteTodo
}
