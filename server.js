import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
const server = fastify()
// criando o database
const database = new DatabaseMemory()
server.get('/', () => {
    return 'Olá mundo!'
})
server.get('/perfume', (request) => {
    // pegando a busca
    const search = request.query.search
    const perfume = database.list(search)
    return perfume
})
server.post('/perfume', (request, reply) => {
    // acessando dados do corpo
    const {marca, volume, fragrancia} = request.body
    database.create({
        marca: marca, 
        volume: volume,
        fragrancia: fragrancia,
    })
    //console.log(marca, volume, fragrancia)
    //retornando o status da rota
    return reply.status(201).send()
})
server.put('/perfume/:id', (request, reply) => {
    // return "Atualizar!"
    // passando id do perfume
    const perfumeId = request.params.id
    // passando restante dos atributos
    const {marca, volume, fragrancia} = request.body
    database.update(perfumeId, {
        marca: marca, 
        volume: volume,
        fragrancia: fragrancia,
    })
// sucesso sem conteudo
    return reply.status(204).send()
})
server.patch('/perfume/:id', (request, reply) => {
    const perfumeId = request.params.id
    const updates = request.body; // os campos a serem atualizados

    const perfumeExistente = database.getById(perfumeId);

    if(!perfumeExistente) {
        return reply.status(404).send({ message: 'Perfume não encontrado'});
    }

    const perfumeAtualizado = { ...perfumeExistente, ...updates };

    database.update(perfumeId, perfumeAtualizado);

    return reply.status(200).send();
})
server.delete('/perfume/:id', (request, reply) => {
// passando Id do perfume
const perfumeId = request.params.id
// deletando perfume
database.delete(perfumeId)
// retornando status de sucesso em branco
return reply.status(204).send()
})    

server.listen({
    port: 3333,
})