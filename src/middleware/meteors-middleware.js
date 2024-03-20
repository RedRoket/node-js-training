const jsonMask = require('json-mask');

const isBadCode = (statusCode) => {
  return statusCode < 200 || statusCode >= 300;
};

const wrap = (resJson) => {
  return function (obj) {
    const countOnly = this.req.query.count_only;
    const wereDangerousMeteors = this.req.query.were_dangerous_meteors;

    if (isBadCode(this.statusCode)) {
      return resJson(...arguments);
    }

    if (countOnly) {
      return resJson(jsonMask(obj, 'elementCount'));
    }

    if (wereDangerousMeteors) {
      return resJson(jsonMask(obj, 'elementCount,wereDangerousMeteors,meteors'));
    }

    return resJson(jsonMask(obj, 'elementCount,meteors'));
  };
};

module.exports = (req, res, next) => {
  if (!res.__isJSONMaskWrapped) {
    res.json = wrap(res.json.bind(res));
    if (req.jsonp) res.jsonp = wrap(res.jsonp.bind(res));
    res.__isJSONMaskWrapped = true;
  }
  next();
};
