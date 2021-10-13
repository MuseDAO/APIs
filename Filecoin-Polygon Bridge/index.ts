import { providers } from "ethers";
import { init } from "@textile/eth-storage";

await window.ethereum.enable();
const provider = new providers.Web3Provider(window.ethereum);
const wallet = provider.getSigner();

const storage = await init(wallet);

const blob = new Blob([""], { type: "text/plain" });
const file = new File([blob], "welcome.txt", {
  type: "text/plain",
  lastModified: new Date().getTime(),
});

await storage.addDeposit();

const { id, cid } = await storage.store(file);

const { request, deals } = await storage.status(id)
console.log(request.status_code)
console.log([...deals])
