import express from "express";
import bodyParser from "body-parser";
import {Responses} from "./fillout";
import {ResponseFiltersType, filterFilloutResponses} from "./filloutFilter";

const app = express();

app.use(bodyParser.json());

const port: string = process.env.PORT || '3000';
app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/:formId/filteredResponses', (req, res): void => {
    const requestFilter: ResponseFiltersType = req.body;
    const formId: string = req.params.formId;
    const offset: number = parseInt(req.query.offset as string) || 0;
    const limit: number = parseInt(req.query.limit as string) || 150;
    filterFilloutResponses(requestFilter, formId).then(filtered => {
        const paginatedData = filtered.slice(offset, offset + limit);
        let responses: Responses = {
            responses: paginatedData,
            totalResponses: filtered.length,
            pageCount: paginatedData.length
        }
        res.json(responses)
    });
});

