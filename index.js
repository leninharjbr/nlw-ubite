
//array

let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckIn: new Date(2024, 2, 1, 20, 20)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckIn: null
  },
  // Adicionando mais 8 participantes
  {
    nome: "Fernanda Lima",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 19, 23),
    dataCheckIn: new Date(2024, 2, 3, 20, 20)
  },
  {
    nome: "João Silva",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 2, 5, 19, 23),
    dataCheckIn: new Date(2024, 2, 5, 20, 20)
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 7, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 9, 19, 23),
    dataCheckIn: new Date(2024, 2, 9, 20, 20)
  },
  {
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 11, 19, 23),
    dataCheckIn: new Date(2024, 2, 11, 20, 20)
  },
  {
    nome: "Lucas Pereira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 13, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana@gmail.com",
    dataInscricao: new Date(2024, 2, 15, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Rafael Oliveira",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 17, 19, 23),
    dataCheckIn: new Date(2024, 2, 17, 20, 20)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckin = dayjs(Date.now())
  .to(participante.dataCheckin)
  
  // condicional
  if(participante.dataCheckin == null) {
    dataCheckin = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes){
    output = output + criarNovoParticipante(participante)
}

 // substituir informação do HTML
 document
 .querySelector('tbody')
 .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  // verirficar se o participante já existe
  const partipanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(partipanteExiste) {
    alert('Email já cadastrado!')
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false){
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante
  participante.dataCheckin = new Date()
  
  // atualizar a lista de participantes
  atualizarLista(participantes)
}