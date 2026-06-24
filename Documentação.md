\-Projeto Arboriza Itaboraí - Oque aprendemos ao longo do projeto?

1. Firebase CRUD

   * AddDoc => Serve para criar um documento em uma coleção referenciada com id automático;
   * SetDoc => Serve para criar ou substituir um documento específico dentro de uma coleção necessitando de um id;
   * UpdateDoc => Serve para atualizar campos específicos em um documento de uma coleção necessitando de um id;
   * DeleteDoc => Serve para deletar um documento em uma coleção precisando de um id.
   * Proxy => Serve para pegar requisições front e buscar dados no backEnd evitando o CORS e também para redirect e proteção de rotas;  --Estudar Mais

sintaxe

addDoc || setDoc || DeleteDoc (collection(db, "users", user.uid)){
   nome: "x"
   ...
}

updateDoc(collection(db,"user")){ => se haver o documento ele atualiza os dados passados e mantem o restante, caso não houver da erro
   nome: "x"
   ...
}