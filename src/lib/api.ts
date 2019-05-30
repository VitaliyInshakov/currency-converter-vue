import Vue from "vue";
import Http from "vue-resource";

type HttpOptions = Http.HttpOptions;
type HttpResponse = Http.HttpResponse;

const V = Vue as any;
const APIpb = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11";

class ApiService {
    private get(url: string, request?: HttpOptions) {
        return V.http
            .get(url, request)
            .then((response: HttpResponse) => response.json())
            .then(jsonResp => ({response: jsonResp, errors: null, status: 201}))
            .catch((error: HttpResponse) => Promise.resolve({response: null, errors: error, status: 422}));
    }

    public async getRates(): Promise<any> {
        return this.get(APIpb);
    }
}

export default new ApiService();