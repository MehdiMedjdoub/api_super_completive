import express from 'express';

class Pagination {
    async paginate (model: any) {

        return async (req: any, res: any, next: express.NextFunction) => {
            console.log(req.body)
            console.log(req.query)
            console.log(req.params)
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.page)
            const startIndex = (page - 1) * limit
            const endIndex = page * limit

            const result = {
                next: {},
                previous: {},
                results: {}
            }

            if (endIndex < (await model.countDocuments().exec())) {
                result.next = {
                    page: page + 1,
                    limit: limit,
                }
            }

            if (startIndex > 0) {
                result.previous = {
                    page: page - 1,
                    limit: limit,
                }
            }

            try {
                result.results = await model.find().limit(limit).skip(startIndex);
                res.paginatedResult = result;
                next();
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        }
    }
}

export default new Pagination();