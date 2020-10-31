module.exports = (req, res) => {
    require('dotenv').config()

    var links = {}
    var things = []
    const DEFAULT = process.env.DEFAULT_URL || ""
    links["DEFAULT"] = DEFAULT

    // this assumes you have set the AIRTABLE_API_KEY and AIRTABLE_BASE_ID environment variables.
    const base = require('airtable').base(process.env.AIRTABLE_BASE_ID);

    function getAirtable() {
        console.log("getting airtable")
        base('Table 1').select({
            maxRecords: 100,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function(record) {
                console.log('Retrieved', record.get('Friendly Name'));
                if (record.get('Active')) {
                    links[record.get('Slug')] = record.get('Redirect URL')
                    console.log('Added', record.get('Slug'), record.get('Redirect URL'));
                    things.push({"url":record.get("Redirect URL"),"name":record.get('Slug'), "public":record.get('Public'),"title":record.get('Friendly Name'), "description":record.get("Description") })
                } else {
                    console.log('Didn\'t add', record.get('Friendly Name'));
                }
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) {
                console.error(err);
                console.log(links);
                return;
            } else {
                console.log(links)
                res.json(things)
                } else {
                    console.log("redir is undefined")
                    redirect("DEFAULT")
                }
            }
        });
    }

    function defaultResponse() {
        console.log("sending default")
        res.json({
            body: req.body,
            query: req.query,
            cookies: req.cookies
        })
    }

    getAirtable()

}
