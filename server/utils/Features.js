class Features {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }
    filtering() {
        const queryObj = { ...this.queryString }

        const excludedFields = ['page', 'sort', 'limit']

        excludedFields.forEach(el => delete (queryObj[el]))

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|regex)\b/g, match => '$' + match)

        this.query.find(JSON.parse(queryStr))
        return this
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }
        return this;
    }
    paginating(resultPerPage) {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || resultPerPage
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}
module.exports = Features