import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export interface Question {
    id: string;
    name: string;
    type: string;
    value: string | number;
}

export interface Response {
    questions: Question[];
}

export interface Responses {
    responses: Response[];
    totalResponses: number;
    pageCount: number;
}

const bearerToken: string = "sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912";

export function callFilloutRequest(formId: string) {

    return new Promise<Responses>((resolve, reject) => {
        const config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        };

        axios.get<Responses>(`https://api.fillout.com/v1/api/forms/${formId}/submissions`, config)
            .then((response: AxiosResponse<Responses>) => {
                resolve(response.data);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
}