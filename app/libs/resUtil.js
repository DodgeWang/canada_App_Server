exports.generateRes = function (data, resStatus) {
    return {
        status  : resStatus,
        data        : data
    };
};