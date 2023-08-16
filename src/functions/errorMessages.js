//const S = require('string');

function errorMessages(res, err) {
    if (String(err).includes(`not found`)) {
        return res.status(404).json({
            status: `Error 404`,
            //statusMessage: S(String(err).replace("Error: ", "")).replaceAll(':', '').s,
            response: String(err),
        });
    }

    if (String(err).includes(`Unknown`)) {
        return res.status(400).json({
            status: `Error`,
            //statusMessage: String(err).replace("Error: ", ""),
            response: String(err)
        });
    }

    if (String(err).includes(`Check`)) {
        return res.status(400).json({
            status: `Error`,
            //statusMessage: String(err).replace("Error: ", ""),
            response: String(err)
        });
    }

    if (String(err).includes(`Error:`)) {
        return res.status(400).json({
            status: `Error`,
            //statusMessage: String(err).replace("Error: ", ""),
            response: String(err)
        });
    }

    console.error(err);
    return res.status(500).json({
        status: `Error`,
        //statusMessage: "Unexpected error. Try again later.",
        response: String(err)
    });
}

module.exports = errorMessages;