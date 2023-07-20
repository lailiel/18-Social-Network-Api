const dayjs = require('dayjs')

function formatDate(timestamp) {
    let formatTimeStamp = dayjs(timestamp).format("DD / MM / YYYY, hh:mm A")
    return formatTimeStamp;
}

module.exports = formatDate