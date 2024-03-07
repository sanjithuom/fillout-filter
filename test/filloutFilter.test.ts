import {ResponseFiltersType, filterFilloutResponses} from '../src/filloutFilter';
import {Responses, Response, callFilloutRequest} from "../src/fillout"; // Import the function to be tested

jest.mock('../src/fillout');

describe('filterFilloutResponses', () => {

    const responses: Responses = {
        "responses": [
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "A"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2024-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 2
                    }
                ]
            },
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "B"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2023-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 50
                    }
                ]
            }
        ],
        "totalResponses": 4,
        "pageCount": 4
    };

    const formId: string = 'testFormId';

    test('filters responses using equal', async () => {

        (callFilloutRequest as jest.Mock).mockResolvedValue(responses);

        const filters: ResponseFiltersType = [
            {
                "id": "1",
                "condition": "equals",
                "value": "A"
            }
        ];


        let filteredResponses: Response[] = await filterFilloutResponses(filters, formId);

        const results: Response[] = [
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "A"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2024-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 2
                    }
                ]
            }
        ];
        expect(results).toEqual(filteredResponses);
    });

    test('filters responses using does_not_equal', async () => {

        (callFilloutRequest as jest.Mock).mockResolvedValue(responses);

        const filters: ResponseFiltersType = [
            {
                "id": "1",
                "condition": "does_not_equal",
                "value": "B"
            }
        ];

        let filteredResponses: Response[] = await filterFilloutResponses(filters, formId);

        const results: Response[] = [
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "A"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2024-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 2
                    }
                ]
            }
        ];
        expect(results).toEqual(filteredResponses);
    });

    test('filters responses using greater_than', async () => {

        (callFilloutRequest as jest.Mock).mockResolvedValue(responses);

        const filters: ResponseFiltersType = [
            {
                "id": "2",
                "condition": "greater_than",
                "value": "2024-01-01"
            }
        ];

        let filteredResponses: Response[] = await filterFilloutResponses(filters, formId);

        let results: Response[] = [
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "A"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2024-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 2
                    }
                ]
            }
        ];
        expect(results).toEqual(filteredResponses);
    });

    test('filters responses using less_than', async () => {

        (callFilloutRequest as jest.Mock).mockResolvedValue(responses);

        const filters: ResponseFiltersType = [
            {
                "id": "3",
                "condition": "less_than",
                "value": 3
            }
        ];
        const formId: string = 'testFormId';

        let filteredResponses: Response[] = await filterFilloutResponses(filters, formId);

        let results: Response[] = [
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "A"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2024-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 2
                    }
                ]
            }
        ];
        expect(results).toEqual(filteredResponses);
    });

    test('filters responses with multiple condition', async () => {

        (callFilloutRequest as jest.Mock).mockResolvedValue(responses);

        const filters: ResponseFiltersType = [
            {
                "id": "1",
                "condition": "equals",
                "value": "A"
            },
            {
                "id": "2",
                "condition": "greater_than",
                "value": "2024-01-01"
            },
            {
                "id": "3",
                "condition": "less_than",
                "value": 3
            }
        ];
        const formId: string = 'testFormId';

        let filteredResponses: Response[] = await filterFilloutResponses(filters, formId);

        let results: Response[] = [
            {
                "questions": [
                    {
                        "id": "1",
                        "name": "Question 1?",
                        "type": "ShortAnswer",
                        "value": "A"
                    },
                    {
                        "id": "2",
                        "name": "Question 2?",
                        "type": "DatePicker",
                        "value": "2024-03-01"
                    },
                    {
                        "id": "3",
                        "name": "Question 3?",
                        "type": "Number",
                        "value": 2
                    }
                ]
            }
        ];
        expect(results).toEqual(filteredResponses);
    });
});
