import instaceApi from "../services/api";

async function toEditInServer(register: Record<string, string>): Promise<any> {
	try {
		let response = await instaceApi.post(`/signup`, register);
		console.log(`response ${JSON.stringify(response.data)}`);
		return response.data;
	} catch (e) {
		console.error(e);
	} finally {
		console.log(`from edit come`);
	}
}

export default toEditInServer;
