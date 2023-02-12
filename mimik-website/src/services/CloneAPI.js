export async function clone_voice(){
    try{
        const respone = await fetch('/api/clone')
        return await respone.arrayBuffer()
    }catch(error){
        return []
    }
}