import { RESTDataSource } from "@apollo/datasource-rest";

export class StoresAPI extends RESTDataSource {
    baseURL = "http://localhost:8080/api/";

    async getStoreDataByStateCode(stateCode) {
        this.logger.info(`Getting for stateCode: ${stateCode}`);
        const data = await this.get("stores", {
            params: {
                stateCode: stateCode,
            },
        });
        return data;
    }
}