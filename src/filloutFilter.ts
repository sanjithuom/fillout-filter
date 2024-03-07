import {callFilloutRequest, Responses, Response, Question} from "./fillout";

type ResponseFilter = {
    id: string;
    condition: 'equals' | 'does_not_equal' | 'greater_than' | 'less_than';
    value: number | string;
}

export type ResponseFiltersType = ResponseFilter[];

export function filterFilloutResponses(filters: ResponseFiltersType, formId: string) {
    return new Promise<Response[]>((resolve, reject) => callFilloutRequest(formId).then(res => {
        resolve(res.responses.filter(response => evaluateResponse(response, filters)))
    }).catch((error: any) => {
        reject(error);
    }))
}

function evaluateResponse(response: Response, filters: ResponseFiltersType) {
    let conditionSuccessful = true
    for (let filter of filters) {
        let question = findQuestionById(response.questions, filter);
        if (question == undefined || !isQuestionConditionMatch(question!, filter)) {
            conditionSuccessful = false;
            break;
        }
    }
    return conditionSuccessful
}

function findQuestionById(questions: Question[], filter: ResponseFilter) {
    return questions.find(question => question.id === filter.id)
}

function isQuestionConditionMatch(question: Question, filter: ResponseFilter) {
    switch (filter.condition) {
        case 'equals':
            return question.value === filter.value
        case 'does_not_equal':
            return question.value !== filter.value
        case 'greater_than':
            return question.value > filter.value
        case 'less_than':
            return question.value < filter.value
        default:
            return false;
    }
}