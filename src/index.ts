import { Server } from "./server";

async function main(){
    const app = new Server(3000);
    await app.listen()
}

main();