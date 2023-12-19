// importando randomUUID
import {randomUUID} from "node:crypto"
export class DatabaseMemory {
#perfume = new Map()

getById(id){
    return this.#perfume.get(id);
}

// listando perfume sem as chaves
list(search){
    return Array.from(this.#perfume.entries()).map((perfumeArray) => {
// primeira posição
       const id = perfumeArray[0]
// segunda posição
       const data = perfumeArray[1]

       return{
        id,
        ...data,
       }
    })
// retornando apenas resultados da pesquisa
   .filter(perfume => {
      if (search) {
        return perfume.marca.includes(search)
      }
      return true
  })
}
// criando perfume
create(perfume){
    // gerando id aleatório com randomUUID
    const perfumeId = randomUUID()
    this.#perfume.set(perfumeId, perfume)
}
// atualizando perfume
update(id, perfume){
    this.#perfume.set(id, perfume)
}
// deletando perfume
delete(id){
    this.#perfume.delete(id)
}
}              
